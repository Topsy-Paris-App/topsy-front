"use client";

import { use, useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { getOrder, ORDER_STATUS, ORDER_TIMELINE, type Order } from "@/lib/api/orders";
import { formatCents } from "@/lib/price";

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/auth/login");
      return;
    }
    getOrder(id)
      .then(setOrder)
      .catch(() => setNotFound(true));
  }, [id, user, isLoading, router]);

  if (isLoading || !user) return null;

  if (notFound) {
    return (
      <div className="section narrow empty-state">
        <p>
          Commande introuvable. <Link href="/dashboard">Mes commandes</Link>
        </p>
      </div>
    );
  }

  if (!order) return <p className="section narrow muted-note">Chargement…</p>;

  const curIdx = Math.max(0, ORDER_TIMELINE.indexOf(order.status));

  return (
    <div className="section narrow">
      <Link className="link-back" href="/dashboard">
        ← mes commandes
      </Link>
      <h1 className="page-title">commande #{order.id.slice(0, 8)}</h1>
      <p className="muted-note">
        Passée le {fmtDate(order.createdAt)} · {order.fulfillment === "delivery" ? "Livraison" : "Retrait"}
      </p>

      <ol className="timeline">
        {ORDER_TIMELINE.map((s, i) => (
          <li key={s} className={`tl${i <= curIdx ? " is-done" : ""}${i === curIdx ? " is-cur" : ""}`}>
            <span className="tl__dot" />
            <span className="tl__label">{ORDER_STATUS[s]?.label ?? s}</span>
          </li>
        ))}
      </ol>

      <div className="confirm__card">
        <ul className="recap">
          {order.items.map((it, i) => (
            <li className="recap__line" key={i}>
              <span className="recap__q">{it.qty}×</span>
              <span className="recap__n">
                {it.name}
                {it.options && it.options.length > 0 ? <em> · {it.options.join(", ")}</em> : null}
              </span>
              <span className="recap__p">{formatCents(it.unitPriceCents * it.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="sumline sumline--total">
          <span>Sous-total</span>
          <strong>{formatCents(order.subtotalCents)}</strong>
        </div>
      </div>
    </div>
  );
}
