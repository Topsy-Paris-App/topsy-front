"use client";

import { useEffect, useState } from "react";
import Stars from "@/components/topsy/Stars";
import { getAllReviews, publishReview, deleteReview, type Review } from "@/lib/api/reviews";

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getAllReviews()
      .then(setReviews)
      .catch(() => setError(true));
  }, []);

  async function onPublish(id: string) {
    await publishReview(id);
    setReviews((rs) => rs?.map((r) => (r.id === id ? { ...r, published: true } : r)) ?? null);
  }

  async function onDelete(id: string) {
    if (!window.confirm("Supprimer cet avis ?")) return;
    await deleteReview(id);
    setReviews((rs) => rs?.filter((r) => r.id !== id) ?? null);
  }

  return (
    <>
      <h1 className="admin__title">Avis</h1>
      <p className="muted-note" style={{ marginBottom: "22px" }}>
        Note affichée sur le site : <b>4,75/5</b>. Publiez ou supprimez les avis reçus.
      </p>

      {error ? (
        <p className="warn">Impossible de charger les avis.</p>
      ) : reviews === null ? (
        <p className="muted-note">Chargement…</p>
      ) : reviews.length === 0 ? (
        <p className="muted-note">Aucun avis pour l&apos;instant.</p>
      ) : (
        <ul className="admin-reviews">
          {reviews.map((r) => (
            <li key={r.id}>
              <div>
                <Stars value={r.rating} size={14} /> <b>{r.author_name}</b>
                {!r.published && <em className="admin-list__name"> · en attente</em>}
                <p>{r.body}</p>
              </div>
              <div className="admin-list__act">
                {!r.published && (
                  <button className="btn btn--outline btn--sm" onClick={() => onPublish(r.id)}>
                    publier
                  </button>
                )}
                <button className="btn btn--ghost-dark btn--sm" onClick={() => onDelete(r.id)}>
                  supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
