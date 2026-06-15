import { apiFetch } from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string | null;
  category: string;
  isAvailable: boolean;
}

export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

/** Public menu grouped by category. */
export function getMenu(): Promise<Category[]> {
  return apiFetch<Category[]>("/menu");
}

/** Public menu item by slug. */
export function getMenuItem(slug: string): Promise<MenuItem> {
  return apiFetch<MenuItem>(`/menu/${slug}`);
}
