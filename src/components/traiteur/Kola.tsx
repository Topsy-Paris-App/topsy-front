"use client";

import { useState } from "react";
import Field from "@/components/topsy/Field";
import { submitInquiry } from "@/lib/api/contact";
import { DEVIS_FORMULAS, DEVIS_OCCASIONS, DEVIS_ZONES } from "@/content/traiteur";

const euro = (n: number) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

export default function Kola() {
  const [occasion, setOccasion] = useState("famille");
  const [convives, setConvives] = useState(20);
  const [formula, setFormula] = useState("tradition");
  const [mode, setMode] = useState<"livraison" | "retrait">("livraison");
  const [zone, setZone] = useState("verte");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fm = DEVIS_FORMULAS.find((f) => f.id === formula)!;
  const z = DEVIS_ZONES.find((x) => x.id === zone)!;
  const n = Math.max(0, convives);
  const base = fm.per * n;
  const minOrder = mode === "retrait" ? 0 : z.min;
  const subtotal = Math.max(base, minOrder);
  const delivery = mode === "retrait" ? 0 : z.fee;
  const low = Math.round(subtotal + delivery);
  const high = Math.round(subtotal * 1.18 + delivery);
  const bigEvent = n >= 40 || occasion === "mariage";
  const canSend = n > 0 && /\S+@\S+/.test(email) && !submitting;

  async function send() {
    if (!canSend) return;
    setError(null);
    setSubmitting(true);
    try {
      await submitInquiry({
        kind: "catering",
        full_name: email,
        email,
        subject: `Devis traiteur — ${fm.label} · ${n} pers.`,
        message: [
          `Occasion : ${occasion}`,
          `Convives : ${n}`,
          `Formule : ${fm.label} (~${euro(fm.per)}/pers.)`,
          `Prestation : ${mode === "livraison" ? `Livraison · ${z.label}` : "Retrait à La Courneuve"}`,
          date && `Date souhaitée : ${date}`,
          `Estimation indicative : ${euro(low)} – ${euro(high)}`,
        ]
          .filter(Boolean)
          .join("\n"),
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Envoi impossible.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="devis__done">
        <h3>Estimation envoyée&nbsp;!</h3>
        <p>
          Votre estimation de{" "}
          <b>
            {euro(low)} – {euro(high)}
          </b>{" "}
          part chez nous. On revient le jour-même avec un devis ferme et personnalisé.
        </p>
      </div>
    );
  }

  return (
    <div className="devis-assist">
      <div className="devis-assist__form">
        <div className="da-field">
          <span className="field__label">L&apos;occasion</span>
          <div className="seg seg--sm">
            {DEVIS_OCCASIONS.map(([v, l]) => (
              <button key={v} type="button" className={occasion === v ? "is-on" : ""} onClick={() => setOccasion(v)}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="da-field">
          <span className="field__label">
            Nombre de convives · <b>{n}</b>
          </span>
          <input
            className="da-range"
            type="range"
            min={6}
            max={300}
            step={1}
            value={n}
            onChange={(e) => setConvives(parseInt(e.target.value) || 0)}
          />
          <div className="da-range__scale">
            <span>6</span>
            <span>150</span>
            <span>300+</span>
          </div>
        </div>

        <div className="da-field">
          <span className="field__label">Formule</span>
          <div className="da-formulas">
            {DEVIS_FORMULAS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`da-formula${formula === f.id ? " is-on" : ""}`}
                onClick={() => setFormula(f.id)}
              >
                <b>{f.label}</b>
                <span>{f.desc}</span>
                <span className="da-formula__inc">
                  <i>Comprend :</i> {f.includes.join(" · ")}
                </span>
                <em>~{euro(f.per)}/pers.</em>
              </button>
            ))}
          </div>
        </div>

        <div className="da-field">
          <span className="field__label">Prestation</span>
          <div className="seg seg--sm">
            <button type="button" className={mode === "livraison" ? "is-on" : ""} onClick={() => setMode("livraison")}>
              Livraison
            </button>
            <button type="button" className={mode === "retrait" ? "is-on" : ""} onClick={() => setMode("retrait")}>
              Retrait
            </button>
          </div>
        </div>

        <div className="form-grid">
          {mode === "livraison" && (
            <Field label="Zone de livraison">
              <select value={zone} onChange={(e) => setZone(e.target.value)}>
                {DEVIS_ZONES.map((x) => (
                  <option key={x.id} value={x.id}>
                    {x.label}
                  </option>
                ))}
              </select>
            </Field>
          )}
          <Field label="Date souhaitée">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>
          <Field label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="vous@email.fr" />
          </Field>
        </div>
      </div>

      <aside className="devis-assist__quote">
        <span className="da-quote__kicker">votre estimation</span>
        <div className="da-quote__range">
          {euro(low)}
          <span> – {euro(high)}</span>
        </div>
        <ul className="da-quote__lines">
          <li>
            <span>
              {fm.label} · {n} pers.
            </span>
            <b>{euro(subtotal)}</b>
          </li>
          {base < minOrder && (
            <li className="da-quote__min">
              <span>Minimum {z.label.toLowerCase()} appliqué</span>
              <b>{euro(minOrder)}</b>
            </li>
          )}
          <li>
            <span>{mode === "livraison" ? "Livraison & mise en place" : "Retrait sur place"}</span>
            <b>{delivery ? euro(delivery) : "gratuit"}</b>
          </li>
        </ul>
        <p className="da-quote__note">
          Estimation indicative — le devis définitif est établi sur demande.
          {bigEvent && " Grand événement : prévenez-nous au moins 10 jours à l'avance."}
        </p>
        {error && <p className="warn">{error}</p>}
        <button className="btn btn--primary block" disabled={!canSend} onClick={send}>
          {submitting ? "envoi…" : "recevoir ce devis"}
        </button>
        <span className="da-quote__trust">Réponse le jour-même · sans engagement</span>
      </aside>
    </div>
  );
}
