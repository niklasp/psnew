import React from "react";

export interface EditorProps {
  initialCode: string;
  height?: string;
  className?: string;
}

export interface ExecutionContext {
  React: typeof React;
  render: (element: React.ReactNode) => void;
}
