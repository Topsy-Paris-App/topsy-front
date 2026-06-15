import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  itemId: string;
  name: string;
  unitPriceCents: number;
  qty: number;
  options?: string[];
}

interface CartState {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (itemId: string) => void;
  updateQty: (itemId: string, qty: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.itemId === item.itemId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.itemId === item.itemId ? { ...i, qty: i.qty + item.qty } : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      remove: (itemId) =>
        set((state) => ({
          items: state.items.filter((i) => i.itemId !== itemId),
        })),
      updateQty: (itemId, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.itemId !== itemId)
              : state.items.map((i) =>
                  i.itemId === itemId ? { ...i, qty } : i,
                ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "topsy_cart" },
  ),
);

export function subtotalCents(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.unitPriceCents * i.qty, 0);
}

export function count(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}
