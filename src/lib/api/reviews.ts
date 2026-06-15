import { apiFetch } from "./client";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Review {
  id: string;
  author_name: string;
  rating: number;
  title: string | null;
  body: string;
  published: boolean;
  created_at: string;
}

// ---------------------------------------------------------------------------
// API functions
// ---------------------------------------------------------------------------

/** Public published reviews. May return an empty list. */
export function getPublishedReviews(): Promise<Review[]> {
  return apiFetch<Review[]>("/reviews?published=true");
}

/** Admin: all reviews regardless of publish state. */
export function getAllReviews(): Promise<Review[]> {
  return apiFetch<Review[]>("/reviews/all");
}

export function publishReview(id: string): Promise<Review> {
  return apiFetch<Review>(`/reviews/${id}/publish`, { method: "PATCH" });
}

export function deleteReview(id: string): Promise<void> {
  return apiFetch<void>(`/reviews/${id}`, { method: "DELETE" });
}
