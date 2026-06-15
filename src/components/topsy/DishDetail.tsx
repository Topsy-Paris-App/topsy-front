"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useCart } from "@/lib/cart/store";
import { formatCents } from "@/lib/price";
import { localize, type MenuItem } from "@/lib/api/menu";
import Badge from "./Badge";
import Photo from "./Photo";

function badgesOf(item: MenuItem): string[] {
  const out: string[] = [];
  if (item.is_signature) out.push("signature");
  if (item.is_frozen) out.push("surgele");
  if (item.spice_level && item.spice_level > 0) out.push("piment");
  return out;
}

export default function DishDetail({ item, locale }: { item: MenuItem; locale: string }) {
  const add = useCart((s) => s.add);
  const [qty, setQty] = useState(1);
  const name = localize(item, "name", locale);
  const description = localize(item, "description", locale);
  const badges = badgesOf(item);

  return (
    <div className="detail">
      <Link className="detail__back" href="/menu">
        ← la carte
      </Link>
      <div className="detail__wrap">
        <div className="detail__media">
          <Photo imageUrl={item.image_url} alt={`photo · ${name}`} radius={16} />
        </div>
        <div className="detail__info">
          {badges.length > 0 && (
            <div className="detail__badges">
              {badges.map((b) => (
                <Badge key={b} kind={b} />
              ))}
            </div>
          )}
          <h1 className="detail__name">{name}</h1>
          <p className="detail__desc">{description}</p>
          <div className="detail__price">{formatCents(item.price_cents)}</div>

          {item.allergens.length > 0 && (
            <p className="detail__allerg">
              <b>Allergènes :</b> {item.allergens.join(", ")}.
            </p>
          )}

          <div className="detail__buy">
            <div className="qty qty--lg">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="moins">
                –
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="plus">
                +
              </button>
            </div>
            <button
              className="btn btn--primary detail__add"
              disabled={!item.is_available}
              onClick={() =>
                add({ itemId: item.id, name, unitPriceCents: item.price_cents, qty, imageUrl: item.image_url })
              }
            >
              ajouter · {formatCents(item.price_cents * qty)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
