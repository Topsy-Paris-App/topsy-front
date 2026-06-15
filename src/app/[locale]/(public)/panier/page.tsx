"use client";

import { Link } from "@/i18n/navigation";
import {
  useCart,
  subtotalCents,
  DELIVERY_MIN_CENTS,
  DELIVERY_FEE_CENTS,
} from "@/lib/cart/store";
import { formatCents } from "@/lib/price";
import Photo from "@/components/topsy/Photo";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const remove = useCart((s) => s.remove);
  const subtotal = subtotalCents(items);
  const under = subtotal < DELIVERY_MIN_CENTS;

  if (items.length === 0) {
    return (
      <div className="section narrow empty-state">
        <h1 className="page-title">votre panier</h1>
        <p>Votre panier est vide pour le moment.</p>
        <Link href="/menu" className="btn btn--primary">
          voir la carte
        </Link>
      </div>
    );
  }

  return (
    <div className="section narrow">
      <h1 className="page-title">votre panier</h1>
      <div className="cartpage">
        <ul className="cartpage__items">
          {items.map((it) => (
            <li className="cline" key={it.key}>
              <div className="cline__thumb" style={{ position: "relative" }}>
                <Photo imageUrl={it.imageUrl} alt="" radius={12} />
              </div>
              <div className="cline__info">
                <span className="cline__name">{it.name}</span>
                {it.options.length > 0 && (
                  <span className="cline__opt">{it.options.map((o) => o.name).join(" · ")}</span>
                )}
                <button className="citem__remove" onClick={() => remove(it.key)}>
                  retirer
                </button>
              </div>
              <div className="qty">
                <button onClick={() => updateQty(it.key, it.qty - 1)}>–</button>
                <span>{it.qty}</span>
                <button onClick={() => updateQty(it.key, it.qty + 1)}>+</button>
              </div>
              <span className="cline__price">{formatCents(it.unitPriceCents * it.qty)}</span>
            </li>
          ))}
        </ul>
        <aside className="cartpage__summary">
          <h3>récapitulatif</h3>
          <div className="sumline">
            <span>Sous-total</span>
            <span>{formatCents(subtotal)}</span>
          </div>
          <div className="sumline sumline--muted">
            <span>Frais de livraison</span>
            <span>dès {formatCents(DELIVERY_FEE_CENTS)}</span>
          </div>
          <div className="sumline sumline--total">
            <span>Total estimé</span>
            <strong>{formatCents(subtotal)}</strong>
          </div>
          {under ? (
            <p className="warn">
              Minimum de commande {formatCents(DELIVERY_MIN_CENTS)}. Ajoutez{" "}
              {formatCents(DELIVERY_MIN_CENTS - subtotal)} pour continuer.
            </p>
          ) : (
            <p className="muted-note">
              Frais de livraison exacts calculés au paiement selon la distance.
            </p>
          )}
          <Link
            href="/checkout"
            className={`btn btn--primary block${under ? " is-disabled" : ""}`}
            onClick={(e) => under && e.preventDefault()}
          >
            commander
          </Link>
          <Link href="/menu" className="link-back">
            ← continuer mes achats
          </Link>
        </aside>
      </div>
    </div>
  );
}
