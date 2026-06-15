import { apiFetch } from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InquiryPayload {
  kind: string;
  full_name: string;
  email: string;
  subject?: string;
  message: string;
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

export function submitInquiry(payload: InquiryPayload): Promise<void> {
  return apiFetch<void>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
