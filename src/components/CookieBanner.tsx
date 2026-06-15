"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";

const COOKIE_KEY = "topsy-cookies";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(COOKIE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function choose(value: "accepted" | "refused") {
    try {
      localStorage.setItem(COOKIE_KEY, value);
    } catch {
      /* storage unavailable — close anyway */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie" role="dialog" aria-label="Gestion des cookies">
      <p>
        Nous utilisons des cookies pour améliorer votre expérience. Seuls les cookies strictement
        nécessaires au panier sont actifs tant que vous n&apos;avez pas accepté. Voir notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link> et la{" "}
        <Link href="/cookies">gestion des cookies</Link>.
      </p>
      <div className="cookie__actions">
        <button className="btn btn--ghost-dark" onClick={() => choose("refused")}>
          refuser
        </button>
        <button className="btn btn--primary" onClick={() => choose("accepted")}>
          accepter
        </button>
      </div>
    </div>
  );
}
