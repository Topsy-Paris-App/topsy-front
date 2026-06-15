"use client";

import { useState } from "react";

const STEPS: Record<"livraison" | "collect", { t: string; d: string }[]> = {
  livraison: [
    { t: "Choisissez votre créneau", d: "Mar–Sam 11h–21h, Dim 11h–14h. Beaucoup de plats en précommande la veille." },
    { t: "Composez dès 45 €", d: "Ajoutez plats, plateaux et formules à votre panier." },
    { t: "Livré chaud en IDF", d: "Frais dès 16 € selon distance, dressage soigné." },
  ],
  collect: [
    { t: "Commandez en ligne", d: "Réglez et choisissez votre créneau de retrait." },
    { t: "On cuisine le jour-même", d: "Vos plats sont prêts à l'heure dite." },
    { t: "Retrait à La Courneuve", d: "10–12 mail de l'Égalité. Sans attente." },
  ],
};

export default function HowToOrder() {
  const [mode, setMode] = useState<"livraison" | "collect">("livraison");
  return (
    <section className="section how">
      <header className="heading heading--center">
        <span className="kicker">simple comme bonjour</span>
        <h2 className="heading__title">comment commander</h2>
        <p className="heading__sub">Deux façons de vous régaler.</p>
      </header>
      <div className="how__tabs">
        <button className={`how__tab${mode === "livraison" ? " is-on" : ""}`} onClick={() => setMode("livraison")}>
          livraison
        </button>
        <button className={`how__tab${mode === "collect" ? " is-on" : ""}`} onClick={() => setMode("collect")}>
          click &amp; collect
        </button>
      </div>
      <ol className="how__steps">
        {STEPS[mode].map((s, i) => (
          <li className="how__step" key={i}>
            <span className="how__num">{i + 1}</span>
            <div>
              <h3 className="how__t">{s.t}</h3>
              <p className="how__d">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="how__note">
        {mode === "livraison"
          ? "Livraison IDF dès 45 € · frais dès 16 €."
          : "Retrait gratuit au 10–12 mail de l'Égalité, La Courneuve."}
      </p>
    </section>
  );
}
