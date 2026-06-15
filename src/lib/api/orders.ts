import { apiFetch } from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface OrderItem {
  itemId: string;
  name: string;
  unitPriceCents: number;
  qty: number;
  options?: string[];
}

export interface Order {
  id: string;
  status: string;
  fulfillment: "delivery" | "pickup";
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address?: string | null;
  note?: string | null;
  items: OrderItem[];
  subtotalCents: number;
  createdAt: string;
}

export interface CreateOrderPayload {
  fulfillment: "delivery" | "pickup";
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address?: string;
  note?: string;
  items: { item_id: string; qty: number; option_ids?: string[] }[];
}

// FR label + style key for each API OrderStatus. `key` matches the .ostatus--* CSS classes.
export const ORDER_STATUS: Record<string, { label: string; key: string }> = {
  pending_payment: { label: "en attente de paiement", key: "payée" },
  paid: { label: "payée", key: "payée" },
  accepted: { label: "acceptée", key: "payée" },
  preparing: { label: "en préparation", key: "enpréparation" },
  ready: { label: "prête", key: "prête" },
  en_route: { label: "en route", key: "enroute" },
  delivered: { label: "livrée", key: "livrée" },
  completed: { label: "terminée", key: "livrée" },
  cancelled: { label: "annulée", key: "enroute" },
  refunded: { label: "remboursée", key: "enroute" },
};

export const ORDER_TIMELINE = ["paid", "preparing", "ready", "en_route", "delivered"];

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

export function createOrder(payload: CreateOrderPayload): Promise<Order> {
  return apiFetch<Order>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getMyOrders(): Promise<Order[]> {
  return apiFetch<Order[]>("/orders/me");
}

export function getOrder(id: string): Promise<Order> {
  return apiFetch<Order>(`/orders/${id}`);
}
