"use client";

import React, { useCallback, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { transform } from "@babel/standalone";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { cn } from "@/app/lib/utils";
import { usePolkadotApi } from "@/contexts/polkadot-api-context";
import { ApiPromise } from "@polkadot/api";
import * as polkadotApi from "@polkadot/api";

interface CodeEditorProps {
  initialCode: string;
  height?: string;
  className?: string;
}

export function CodeEditor({
  initialCode,
  height = "400px",
  className
}: CodeEditorProps) {
  const { api, isApiReady, error: apiError } = usePolkadotApi();
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (!value) return;
    setCode(value);
  }, []);

  const executeCode = useCallback(() => {
    if (!isApiReady || !api) {
      setError("Blockchain API is not ready");
      return;
    }

    try {
      setError(null);

      const transformedCode = transform(
        `
        import React, { useState, useEffect } from 'react';
        import { ApiPromise } from '@polkadot/api';
        ${code}
      `,
        {
          presets: ["react"],
          plugins: ["transform-modules-commonjs"]
        }
      ).code;

      const sandbox = {
        React,
        useState: React.useState,
        useEffect: React.useEffect,
        require: (module: string) => {
          if (module === "react") return React;
          if (module === "@polkadot/api") return polkadotApi;
          throw new Error(`Cannot load module "${module}"`);
        },
        console,
        api,
        exports: {}
      };

      const executeFunction = new Function(
        ...Object.keys(sandbox),
        `
        try {
          ${transformedCode}
          return exports.default;
        } catch (error) {
          throw error;
        }
      `
      );

      const Component = executeFunction(...Object.values(sandbox));
      setOutput(React.createElement(Component));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error(err);
    }
  }, [code, api, isApiReady]);

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      <div className="space-y-4">
        {apiError && <>failed to connect to blockchain</>}

        <div className="relative">
          <div className="absolute top-[5px] -right-[5px] w-[calc(100%)] h-[calc(100%)] bg-gradient-to-r from-pink-500 to-blue-500 rounded-xl -z-10" />

          <Editor
            height={height}
            defaultLanguage="typescript"
            defaultValue={initialCode}
            onChange={handleEditorChange}
            className="overflow-hidden rounded-lg"
            wrapperProps={{
              className: "overflow-hidden rounded-lg"
            }}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: { top: 10, bottom: 10 }
            }}
            theme="vs-dark"
            beforeMount={(monaco) => {
              monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
                {
                  target: monaco.languages.typescript.ScriptTarget.Latest,
                  allowNonTsExtensions: true,
                  moduleResolution:
                    monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                  module: monaco.languages.typescript.ModuleKind.CommonJS,
                  noEmit: true,
                  esModuleInterop: true,
                  jsx: monaco.languages.typescript.JsxEmit.React,
                  reactNamespace: "React",
                  allowJs: true,
                  typeRoots: ["node_modules/@types"]
                }
              );

              // Add React types
              monaco.languages.typescript.typescriptDefaults.addExtraLib(
                `
                declare module "react" {
                  function useState<T>(initialState: T): [T, (newState: T) => void]
                  function useEffect(effect: () => void | (() => void), deps?: readonly any[]): void
                }
                `,
                "file:///node_modules/@types/react/index.d.ts"
              );
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={executeCode}
            disabled={!isApiReady}
            className="w-[calc(100%+20px)]"
          >
            {!isApiReady ? "Connecting to Blockchain..." : "Run Code"}
          </Button>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
      </div>

      <div className="rounded-lg min-h-[200px]">
        <Card className="overflow-scroll h-full p-4">{output}</Card>
      </div>
    </div>
  );
}
