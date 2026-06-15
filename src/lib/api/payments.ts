import { apiFetch } from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Checkout {
  url: string;
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

export function createCheckout(orderId: string): Promise<Checkout> {
  return apiFetch<Checkout>(`/payments/checkout/${orderId}`, {
    method: "POST",
  });
}
