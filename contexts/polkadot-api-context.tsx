"use client";

import { ApiPromise, WsProvider } from "@polkadot/api";
import { createContext, useContext, useEffect, useState } from "react";

interface PolkadotApiContextType {
  api: ApiPromise | null;
  isApiReady: boolean;
  error: Error | null;
}

const PolkadotApiContext = createContext<PolkadotApiContextType>({
  api: null,
  isApiReady: false,
  error: null
});

interface PolkadotApiProviderProps {
  children: React.ReactNode;
  wsEndpoint: string;
}

export function PolkadotApiProvider({
  children,
  wsEndpoint
}: PolkadotApiProviderProps) {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [isApiReady, setIsApiReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initializeApi = async () => {
      console.log("Initializing API connection to:", wsEndpoint);
      try {
        const provider = new WsProvider(wsEndpoint);

        // Add event listeners for connection status
        provider.on("connected", () => console.log("WS Connected"));
        provider.on("error", (error) => console.error("WS Error:", error));
        provider.on("disconnected", () => console.log("WS Disconnected"));

        console.log("Creating API instance...");
        const api = await ApiPromise.create({ provider });

        console.log("Waiting for API ready state...");
        await api.isReady;

        console.log("API is ready!");
        setApi(api);
        setIsApiReady(true);
      } catch (err) {
        console.error("API initialization error:", err);
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to connect to blockchain")
        );
      }
    };

    initializeApi();

    return () => {
      if (api) {
        console.log("Disconnecting API...");
        api.disconnect();
        setApi(null);
        setIsApiReady(false);
      }
    };
  }, [wsEndpoint]);

  // Add connection status display for debugging
  return (
    <PolkadotApiContext.Provider value={{ api, isApiReady, error }}>
      <div className="text-sm text-muted-foreground mb-2">
        {error && (
          <span className="text-red-500 ml-2">❌ Error: {error.message}</span>
        )}
      </div>
      {children}
    </PolkadotApiContext.Provider>
  );
}

export const usePolkadotApi = () => useContext(PolkadotApiContext);
