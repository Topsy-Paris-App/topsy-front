"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart/store";
import { formatCents } from "@/lib/price";
import { localize, type MenuItem } from "@/lib/api/menu";
import Badge from "./Badge";
import Photo from "./Photo";

interface Props {
  item: MenuItem;
  locale: string;
}

function badgesOf(item: MenuItem): string[] {
  const out: string[] = [];
  if (item.is_signature) out.push("signature");
  if (item.is_frozen) out.push("surgele");
  if (item.spice_level && item.spice_level > 0) out.push("piment");
  return out;
}

export default function DishCard({ item, locale }: Props) {
  const add = useCart((s) => s.add);
  const [added, setAdded] = useState(false);
  const name = localize(item, "name", locale);
  const description = localize(item, "description", locale);
  const href = `/menu/${item.slug}`;
  const badges = badgesOf(item);

  function onAdd() {
    add({ itemId: item.id, name, unitPriceCents: item.price_cents, qty: 1, imageUrl: item.image_url });
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  }

  return (
    <article className="dish">
      <Link href={href} className="dish__media" aria-label={`Voir ${name}`}>
        <Photo imageUrl={item.image_url} alt={`photo · ${name}`} />
        {badges.length > 0 && (
          <div className="dish__badges">
            {badges.map((b) => (
              <Badge key={b} kind={b} />
            ))}
          </div>
        )}
      </Link>
      <div className="dish__body">
        <Link href={href} className="dish__name">
          {name}
        </Link>
        <p className="dish__blurb">{description}</p>
        <div className="dish__foot">
          <span className="dish__price">{formatCents(item.price_cents)}</span>
          <button
            type="button"
            className={`add-btn${added ? " add-btn--on" : ""}`}
            onClick={onAdd}
            disabled={!item.is_available}
            aria-label="Ajouter au panier"
          >
            {added ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4 10-11" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
