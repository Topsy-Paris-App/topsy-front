import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartOption {
  id: string;
  name: string;
  price_cents: number;
}

export interface CartItem {
  key: string;
  itemId: string;
  slug: string;
  name: string;
  basePriceCents: number;
  options: CartOption[];
  qty: number;
  unitPriceCents: number;
  imageUrl?: string | null;
}

/** Stable key for an item + its selected options, so distinct configs are distinct lines. */
export function lineKey(itemId: string, optionIds: string[]): string {
  return [itemId, ...[...optionIds].sort()].join("|");
}

export type CreneauMode = "livraison" | "retrait";

export interface Creneau {
  mode: CreneauMode;
  date: string | null;
  dateLabel: string | null;
  time: string | null;
}

interface CartState {
  items: CartItem[];
  creneau: Creneau;
  add: (item: CartItem) => void;
  remove: (key: string) => void;
  updateQty: (key: string, qty: number) => void;
  clear: () => void;
  setCreneau: (creneau: Creneau) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      creneau: { mode: "livraison", date: null, dateLabel: null, time: null },
      add: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.key === item.key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === item.key ? { ...i, qty: i.qty + item.qty } : i,
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      remove: (key) =>
        set((state) => ({
          items: state.items.filter((i) => i.key !== key),
        })),
      updateQty: (key, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) =>
                  i.key === key ? { ...i, qty } : i,
                ),
        })),
      clear: () => set({ items: [] }),
      setCreneau: (creneau) => set({ creneau }),
    }),
    { name: "topsy_cart_v2", version: 1 },
  ),
);

export function subtotalCents(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.unitPriceCents * i.qty, 0);
}

export function count(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}

// ---------------------------------------------------------------------------
// Créneau helpers — minimum order, service slots, next valid days.
// ---------------------------------------------------------------------------

export const DELIVERY_MIN_CENTS = 4500;
export const DELIVERY_FEE_CENTS = 1600;

export const SLOTS_MIDI = ["11:30", "12:00", "12:30", "13:00", "13:30", "14:00"];
export const SLOTS_SOIR = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

const JOURS = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

export interface CreneauDay {
  iso: string;
  label: string;
}

/** Next valid service days (Tue–Sun), starting tomorrow (precommande la veille). */
export function nextDays(count = 8): CreneauDay[] {
  const out: CreneauDay[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (out.length < count) {
    if (d.getDay() !== 1) {
      out.push({
        iso: d.toISOString().slice(0, 10),
        label: `${JOURS[d.getDay()]} ${d.getDate()} ${MOIS[d.getMonth()]}`,
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}
