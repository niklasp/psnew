"use client";

import { CodeEditor } from "@/components/code-playground/code-editor";
import { PolkadotApiProvider } from "@/contexts/polkadot-api-context";
import React, { useState, useEffect } from "react";

// Use the actual Paseo testnet endpoint
const PASEO_WS_ENDPOINT = "wss://rpc.ibp.network/paseo";

const initialCode = `export default function BlockInfo() {
  const [blockNumber, setBlockNumber] = useState("Loading...");
  const [blockHash, setBlockHash] = useState("Loading...");
  
  useEffect(() => {
    let unsub;
    
    async function getBlockInfo() {
      try {
        // api is available directly from the sandbox
        unsub = await api.rpc.chain.subscribeNewHeads((header) => {
          setBlockNumber(header.number.toString());
          setBlockHash(header.hash.toString());
        });
      } catch (error) {
        console.error("Failed to get block info:", error);
        setBlockNumber("Error");
        setBlockHash("Error");
      }
    }
    
    getBlockInfo();
    
    return () => {
      if (unsub) unsub();
    };
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "monospace" }}>
      <h2>Current Block Info</h2>
      <p>Block Number: {blockNumber}</p>
      <p>Block Hash: {blockHash}</p>
    </div>
  );
}`;

export default function ExamplesPage() {
  return (
    <PolkadotApiProvider wsEndpoint={PASEO_WS_ENDPOINT}>
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">React Code Playground</h1>
        <CodeEditor initialCode={initialCode} />
      </div>
    </PolkadotApiProvider>
  );
}
