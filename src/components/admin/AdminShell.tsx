"use client";

import { useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

const ADMIN_NAV: [string, string][] = [
  ["Tableau de bord", "/admin"],
  ["Commandes", "/admin/orders"],
  ["Carte", "/admin/menu"],
  ["Avis", "/admin/reviews"],
  ["Leads", "/admin/leads"],
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/auth/login");
    else if (user.role !== "admin") router.replace("/unauthorized");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") return null;

  return (
    <div className="admin">
      <aside className="admin__side">
        <Link className="admin__brand" href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" /> <span>admin</span>
        </Link>
        <nav>
          {ADMIN_NAV.map(([label, to]) => (
            <Link key={to} href={to} className={pathname === to ? "is-on" : ""}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="admin__exits">
          <Link className="admin__exit" href="/dashboard">
            → espace client
          </Link>
          <Link className="admin__exit" href="/">
            ← retour au site
          </Link>
        </div>
      </aside>
      <div className="admin__main">{children}</div>
    </div>
  );
}
