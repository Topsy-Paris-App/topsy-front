"use client";

import { createContext, useContext } from "react";

interface UIContextValue {
  openDrawer: () => void;
  openCreneau: () => void;
}

export const UIContext = createContext<UIContextValue | null>(null);

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within Chrome");
  return ctx;
}
