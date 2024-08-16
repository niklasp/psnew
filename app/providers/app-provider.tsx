"use client";

import { createContext, Dispatch, useContext, useState } from "react";
import { filters } from "../lib/config";

export type FiltersType = Record<string, string[]>;

export type AppContextType = {
  filters: FiltersType;
  setFilters: Dispatch<FiltersType>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultFilters = {
  category: [],
  tags: [],
  level: []
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);

  return (
    <AppContext.Provider value={{ filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};
