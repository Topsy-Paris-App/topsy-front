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
  items: { item_id: string; qty: number; options?: string[] }[];
}

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
