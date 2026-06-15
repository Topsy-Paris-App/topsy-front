"use client";

import { useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { getMyOrders, ORDER_STATUS, type Order } from "@/lib/api/orders";
import { formatCents } from "@/lib/price";

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/auth/login");
      return;
    }
    getMyOrders()
      .then(setOrders)
      .catch(() => setOrders([]));
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  return (
    <div className="section narrow dash">
      <div className="dash__head">
        <div>
          <span className="kicker">espace client</span>
          <h1 className="page-title">bonjour, {user.firstName || user.email}</h1>
        </div>
        <div className="dash__head-actions">
          <Link href="/dashboard/profile" className="btn btn--outline btn--sm">
            mon profil
          </Link>
          <button className="btn btn--ghost-dark btn--sm" onClick={logout}>
            se déconnecter
          </button>
        </div>
      </div>

      {orders === null ? (
        <p className="muted-note">Chargement de vos commandes…</p>
      ) : orders.length === 0 ? (
        <div className="empty-state empty-state--box">
          <p>Aucune commande pour l&apos;instant.</p>
          <Link href="/menu" className="btn btn--primary">
            passer commande
          </Link>
        </div>
      ) : (
        <ul className="orders">
          {orders.map((o) => {
            const st = ORDER_STATUS[o.status] ?? { label: o.status, key: "payée" };
            const articles = o.items.reduce((s, i) => s + i.qty, 0);
            return (
              <li className="ocard" key={o.id}>
                <div className="ocard__main">
                  <div className="ocard__top">
                    <b>#{o.id.slice(0, 8)}</b>
                    <span className={`ostatus ostatus--${st.key}`}>{st.label}</span>
                  </div>
                  <span className="ocard__meta">
                    {fmtDate(o.createdAt)} · {articles} article{articles > 1 ? "s" : ""} ·{" "}
                    {o.fulfillment === "delivery" ? "Livraison" : "Retrait"}
                  </span>
                </div>
                <div className="ocard__right">
                  <b className="ocard__total">{formatCents(o.subtotalCents)}</b>
                  <div className="ocard__btns">
                    <Link href={`/dashboard/orders/${o.id}`} className="btn btn--outline btn--sm">
                      détail
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
