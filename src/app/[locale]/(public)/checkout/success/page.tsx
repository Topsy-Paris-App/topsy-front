"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { getOrder, type Order } from "@/lib/api/orders";
import { formatCents } from "@/lib/price";

function SuccessContent() {
  const orderId = useSearchParams().get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let active = true;
    const interval = setInterval(async () => {
      try {
        const fetched = await getOrder(orderId);
        if (!active) return;
        setOrder(fetched);
        if (fetched.status !== "pending") clearInterval(interval);
      } catch {
        // keep polling
      }
    }, 2000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [orderId]);

  return (
    <div className="section narrow confirm">
      <div className="confirm__badge">
        <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4 10-12" />
        </svg>
      </div>
      <h1 className="page-title">merci, c&apos;est commandé&nbsp;!</h1>
      {order ? (
        <>
          <p className="confirm__lead">
            Votre commande est <b>{order.status}</b>. On la cuisine le jour-même.
          </p>
          <div className="confirm__card">
            <ul className="recap">
              {order.items.map((it) => (
                <li className="recap__line" key={it.itemId}>
                  <span className="recap__q">{it.qty}×</span>
                  <span className="recap__n">{it.name}</span>
                  <span className="recap__p">{formatCents(it.unitPriceCents * it.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="sumline sumline--total">
              <span>Total</span>
              <strong>{formatCents(order.subtotalCents)}</strong>
            </div>
          </div>
        </>
      ) : (
        <p className="confirm__lead">Chargement de votre commande…</p>
      )}
      <div className="confirm__cta">
        <Link href="/menu" className="btn btn--outline">
          retour à la carte
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
