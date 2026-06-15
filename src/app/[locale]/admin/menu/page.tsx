"use client";

import { useEffect, useState } from "react";
import { getMenu, type Category } from "@/lib/api/menu";
import { formatCents } from "@/lib/price";

export default function AdminMenu() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getMenu()
      .then(setCategories)
      .catch(() => setError(true));
  }, []);

  return (
    <>
      <h1 className="admin__title">Carte</h1>
      <p className="muted-note">
        Aperçu de la carte publiée. L&apos;édition des plats se fait côté API ; cette vue est en lecture
        seule tant que les endpoints d&apos;administration de la carte ne sont pas exposés.
      </p>

      {error ? (
        <p className="warn">Impossible de charger la carte.</p>
      ) : categories === null ? (
        <p className="muted-note">Chargement…</p>
      ) : categories.length === 0 ? (
        <p className="muted-note">Aucune catégorie pour l&apos;instant.</p>
      ) : (
        categories.map((c) => (
          <div key={c.id} className="admin-cat">
            <h3>
              {c.name_fr} <span className="admin-cat__count">{c.items.length}</span>
            </h3>
            <ul className="admin-list">
              {c.items.length === 0 && <li className="admin-list__empty">Aucun plat.</li>}
              {c.items.map((d) => (
                <li key={d.id} className={!d.is_available ? "is-off" : ""}>
                  <span className="admin-list__name">
                    {d.name_fr}
                    {!d.is_available && <em> · masqué</em>}
                  </span>
                  <span className="admin-list__price">{formatCents(d.price_cents)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </>
  );
}
