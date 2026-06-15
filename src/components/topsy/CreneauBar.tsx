"use client";

import { useCart } from "@/lib/cart/store";
import { useUI } from "./ui-context";

export default function CreneauBar() {
  const creneau = useCart((s) => s.creneau);
  const { openCreneau } = useUI();
  const set = creneau.date && creneau.time;
  return (
    <button className="creneaubar" onClick={openCreneau}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
        <path d="M3 9h18M8 2.5v4M16 2.5v4" />
      </svg>
      <span className="creneaubar__mode">{creneau.mode === "livraison" ? "Livraison" : "Retrait"}</span>
      <span className="creneaubar__when">
        {set ? `${creneau.dateLabel} · ${creneau.time}` : "choisir un créneau"}
      </span>
      <span className="creneaubar__edit">modifier</span>
    </button>
  );
}
