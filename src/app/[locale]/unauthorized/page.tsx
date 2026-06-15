"use client";

import { Link } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/AuthContext";

export default function UnauthorizedPage() {
  const { user } = useAuth();

  const isGuest = !user;
  const title = isGuest ? "connexion requise" : "accès refusé";
  const description = isGuest
    ? "Vous devez être connecté·e pour accéder à cette page."
    : "Vous n'avez pas les droits pour accéder à cette page. Cet espace est réservé à un autre type de compte.";

  const dashboardHref = user?.role === "admin" ? "/admin" : "/dashboard";

  return (
    <div className="section narrow auth">
      <span className="kicker">{isGuest ? "401" : "403"}</span>
      <h1 className="page-title page-title--lg">{title}</h1>
      <p className="muted-note" style={{ textAlign: "center", marginBottom: 24 }}>
        {description}
      </p>
      <div className="auth__form" style={{ flexDirection: "row", justifyContent: "center" }}>
        {isGuest ? (
          <Link className="btn btn--primary" href="/auth/login">
            se connecter
          </Link>
        ) : (
          <Link className="btn btn--primary" href={dashboardHref}>
            mon espace
          </Link>
        )}
        <Link className="btn btn--outline" href="/">
          accueil
        </Link>
      </div>
    </div>
  );
}
