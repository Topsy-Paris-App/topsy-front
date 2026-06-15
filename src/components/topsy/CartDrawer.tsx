"use client";

import { Link } from "@/i18n/navigation";
import { useCart, subtotalCents, DELIVERY_MIN_CENTS } from "@/lib/cart/store";
import { formatCents } from "@/lib/price";
import Photo from "./Photo";

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const remove = useCart((s) => s.remove);
  const subtotal = subtotalCents(items);
  const remaining = Math.max(0, DELIVERY_MIN_CENTS - subtotal);
  const pct = Math.min(100, (subtotal / DELIVERY_MIN_CENTS) * 100);
  const under = subtotal < DELIVERY_MIN_CENTS;

  return (
    <>
      <div className={`drawer-scrim${open ? " is-open" : ""}`} onClick={onClose} />
      <aside className={`drawer${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="drawer__head">
          <h3>votre panier</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Fermer">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        {items.length === 0 ? (
          <div className="drawer__empty">
            <p>Votre panier est vide.</p>
            <span>Ajoutez un plat pour commencer.</span>
            <Link href="/menu" className="btn btn--outline" onClick={onClose}>
              voir la carte
            </Link>
          </div>
        ) : (
          <>
            <div className="drawer__progress">
              <div className="drawer__bar">
                <span style={{ width: `${pct}%` }} />
              </div>
              <p>
                {remaining > 0 ? (
                  <>
                    Plus que <b>{formatCents(remaining)}</b> pour atteindre le minimum de commande.
                  </>
                ) : (
                  <>Minimum de commande atteint&nbsp;! 🎉</>
                )}
              </p>
            </div>
            <ul className="drawer__items">
              {items.map((it) => (
                <li className="citem" key={it.key}>
                  <div className="citem__thumb" style={{ position: "relative" }}>
                    <Photo imageUrl={it.imageUrl} alt="" radius={10} />
                  </div>
                  <div className="citem__info">
                    <span className="citem__name">{it.name}</span>
                    {(it.options ?? []).length > 0 && (
                      <span className="citem__opt">{(it.options ?? []).map((o) => o.name).join(" · ")}</span>
                    )}
                    <span className="citem__price">{formatCents(it.unitPriceCents * it.qty)}</span>
                    <button className="citem__remove" onClick={() => remove(it.key)}>
                      retirer
                    </button>
                  </div>
                  <div className="qty">
                    <button onClick={() => updateQty(it.key, it.qty - 1)} aria-label="moins">
                      –
                    </button>
                    <span>{it.qty}</span>
                    <button onClick={() => updateQty(it.key, it.qty + 1)} aria-label="plus">
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer__foot">
              <div className="drawer__line">
                <span>Sous-total</span>
                <strong>{formatCents(subtotal)}</strong>
              </div>
              <p className="drawer__fee">
                {under
                  ? `Minimum ${formatCents(DELIVERY_MIN_CENTS)} pour commander.`
                  : "Frais de livraison calculés au paiement."}
              </p>
              <Link
                href="/checkout"
                className={`btn btn--primary drawer__checkout${under ? " is-disabled" : ""}`}
                onClick={(e) => {
                  if (under) e.preventDefault();
                  else onClose();
                }}
              >
                commander · {formatCents(subtotal)}
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
