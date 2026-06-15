import { apiFetch } from "./client";

// ---------------------------------------------------------------------------
// Types — match the real API shape (GET /menu, GET /menu/:slug).
// ---------------------------------------------------------------------------

export interface MenuItem {
  id: string;
  category_id: string;
  slug: string;
  name_fr: string;
  name_en: string | null;
  description_fr: string | null;
  description_en: string | null;
  price_cents: number;
  image_url: string | null;
  is_signature: boolean;
  is_frozen: boolean;
  is_available: boolean;
  position: number;
  allergens: string[];
  spice_level: number | null;
}

export interface Category {
  id: string;
  slug: string;
  name_fr: string;
  name_en: string | null;
  position: number;
  active: boolean;
  items: MenuItem[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve a localized field pair (`name`, `description`, …), falling back to FR. */
export function localize(
  x: MenuItem | Category,
  field: "name" | "description",
  locale: string,
): string {
  const record = x as unknown as Record<string, unknown>;
  const fr = record[`${field}_fr`];
  const en = record[`${field}_en`];
  const value = locale === "en" ? (en ?? fr) : fr;
  return typeof value === "string" ? value : "";
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
