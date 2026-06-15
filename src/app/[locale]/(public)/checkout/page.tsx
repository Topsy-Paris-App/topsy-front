"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useUI } from "@/components/topsy/ui-context";
import {
  useCart,
  subtotalCents,
  DELIVERY_FEE_CENTS,
} from "@/lib/cart/store";
import { formatCents } from "@/lib/price";
import { createOrder } from "@/lib/api/orders";
import { createCheckout } from "@/lib/api/payments";

const STEPS = ["Créneau", "Coordonnées", "Paiement"];
const IDF_PREFIXES = ["75", "77", "78", "91", "92", "93", "94", "95"];

interface FormValues {
  prenom: string;
  nom: string;
  tel: string;
  email: string;
  adresse: string;
  cp: string;
  ville: string;
  note: string;
  cgv: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { openCreneau } = useUI();
  const items = useCart((s) => s.items);
  const creneau = useCart((s) => s.creneau);
  const setCreneau = useCart((s) => s.setCreneau);
  const clear = useCart((s) => s.clear);

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [f, setF] = useState<FormValues>({
    prenom: "",
    nom: "",
    tel: "",
    email: "",
    adresse: "",
    cp: "",
    ville: "",
    note: "",
    cgv: false,
  });
  const set = <K extends keyof FormValues>(k: K, v: FormValues[K]) =>
    setF((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    if (items.length === 0) router.push("/menu");
  }, [items.length, router]);

  const mode = creneau.mode;
  const subtotal = subtotalCents(items);
  const inZone = mode === "retrait" || (f.cp.length >= 2 && IDF_PREFIXES.includes(f.cp.slice(0, 2)));
  const creneauSet = Boolean(creneau.date && creneau.time);
  const fee = mode === "livraison" ? DELIVERY_FEE_CENTS : 0;
  const total = subtotal + fee;

  const step2valid =
    f.prenom && f.nom && f.tel && f.email && (mode === "retrait" || (f.adresse && f.cp && f.ville && inZone));
  const step3valid = f.cgv;

  async function pay() {
    setSubmitting(true);
    try {
      const order = await createOrder({
        fulfillment: mode === "livraison" ? "delivery" : "pickup",
        customer_name: `${f.prenom} ${f.nom}`.trim(),
        customer_email: f.email,
        customer_phone: f.tel,
        address: mode === "livraison" ? `${f.adresse}, ${f.cp} ${f.ville}` : undefined,
        note: f.note || undefined,
        items: items.map((i) => ({
          item_id: i.itemId,
          qty: i.qty,
          option_ids: i.options.map((o) => o.id),
        })),
      });
      const checkout = await createCheckout(order.id);
      clear();
      window.location.href = checkout.url;
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <div className="section narrow checkout">
      <h1 className="page-title">commande</h1>
      <ol className="stepper">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={`stepper__i${step === i + 1 ? " is-on" : ""}${step > i + 1 ? " is-done" : ""}`}
          >
            <span className="stepper__n">{step > i + 1 ? "✓" : i + 1}</span>
            <span className="stepper__l">{s}</span>
          </li>
        ))}
      </ol>

      <div className="checkout__grid">
        <div className="checkout__main">
          {step === 1 && (
            <div className="cbox">
              <h3>Mode &amp; créneau</h3>
              <div className="seg">
                <button
                  className={mode === "livraison" ? "is-on" : ""}
                  onClick={() => setCreneau({ ...creneau, mode: "livraison" })}
                >
                  Livraison
                </button>
                <button
                  className={mode === "retrait" ? "is-on" : ""}
                  onClick={() => setCreneau({ ...creneau, mode: "retrait" })}
                >
                  Retrait
                </button>
              </div>
              <div className="creneau-recap">
                <div>
                  <span className="creneau-recap__when">
                    {creneauSet ? `${creneau.dateLabel} · ${creneau.time}` : "Aucun créneau choisi"}
                  </span>
                  <span className="creneau-recap__sub">
                    {mode === "livraison"
                      ? "Livraison à votre adresse"
                      : "Retrait · 10–12 mail de l'Égalité, La Courneuve"}
                  </span>
                </div>
                <button className="btn btn--outline btn--sm" onClick={openCreneau}>
                  {creneauSet ? "modifier" : "choisir"}
                </button>
              </div>
              <button className="btn btn--primary block" disabled={!creneauSet} onClick={() => setStep(2)}>
                continuer
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="cbox">
              <h3>Vos coordonnées</h3>
              <div className="form-grid">
                <label className="field">
                  <span className="field__label">Prénom</span>
                  <input value={f.prenom} onChange={(e) => set("prenom", e.target.value)} />
                </label>
                <label className="field">
                  <span className="field__label">Nom</span>
                  <input value={f.nom} onChange={(e) => set("nom", e.target.value)} />
                </label>
                <label className="field">
                  <span className="field__label">Téléphone</span>
                  <input value={f.tel} onChange={(e) => set("tel", e.target.value)} placeholder="07 87 75 96 10" />
                </label>
                <label className="field">
                  <span className="field__label">Email</span>
                  <input value={f.email} onChange={(e) => set("email", e.target.value)} type="email" />
                </label>
              </div>
              {mode === "livraison" && (
                <>
                  <h4 className="cbox__sub">Adresse de livraison</h4>
                  <div className="form-grid">
                    <label className="field span2">
                      <span className="field__label">Adresse</span>
                      <input value={f.adresse} onChange={(e) => set("adresse", e.target.value)} />
                    </label>
                    <label className="field">
                      <span className="field__label">Code postal</span>
                      <input
                        value={f.cp}
                        onChange={(e) => set("cp", e.target.value.replace(/\D/g, "").slice(0, 5))}
                        placeholder="93120"
                      />
                    </label>
                    <label className="field">
                      <span className="field__label">Ville</span>
                      <input value={f.ville} onChange={(e) => set("ville", e.target.value)} />
                    </label>
                  </div>
                  {f.cp.length >= 2 && !inZone && (
                    <p className="warn">
                      Désolé, nous ne livrons pas encore le {f.cp.slice(0, 2)}. Optez pour le retrait à
                      La Courneuve.
                    </p>
                  )}
                </>
              )}
              <div className="cbox__nav">
                <button className="btn btn--outline" onClick={() => setStep(1)}>
                  retour
                </button>
                <button className="btn btn--primary" disabled={!step2valid} onClick={() => setStep(3)}>
                  continuer
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="cbox">
              <h3>Paiement</h3>
              <p className="muted-note">
                Vous serez redirigé·e vers notre page de paiement sécurisée pour régler votre commande.
              </p>
              <label className="field span2" style={{ marginTop: 16 }}>
                <span className="field__label">Note pour la cuisine (optionnel)</span>
                <textarea rows={3} value={f.note} onChange={(e) => set("note", e.target.value)} />
              </label>
              <label className="checkbox">
                <input type="checkbox" checked={f.cgv} onChange={(e) => set("cgv", e.target.checked)} />
                <span>
                  J&apos;accepte les <a href="/cgv">conditions générales de vente</a>.
                </span>
              </label>
              <div className="cbox__nav">
                <button className="btn btn--outline" onClick={() => setStep(2)}>
                  retour
                </button>
                <button className="btn btn--primary" disabled={!step3valid || submitting} onClick={pay}>
                  {submitting ? "redirection…" : `payer ${formatCents(total)}`}
                </button>
              </div>
              <p className="secure-note">🔒 Paiement sécurisé.</p>
            </div>
          )}
        </div>

        <aside className="checkout__aside">
          <h3>votre commande</h3>
          <ul className="recap">
            {items.map((it) => (
              <li className="recap__line" key={it.key}>
                <span className="recap__q">{it.qty}×</span>
                <span className="recap__n">
                  {it.name}
                  {it.options.length > 0 && (
                    <em> · {it.options.map((o) => o.name).join(" · ")}</em>
                  )}
                </span>
                <span className="recap__p">{formatCents(it.unitPriceCents * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="sumline">
            <span>Sous-total</span>
            <span>{formatCents(subtotal)}</span>
          </div>
          <div className="sumline sumline--muted">
            <span>{mode === "livraison" ? "Livraison" : "Retrait"}</span>
            <span>{fee ? formatCents(fee) : "gratuit"}</span>
          </div>
          <div className="sumline sumline--total">
            <span>Total</span>
            <strong>{formatCents(total)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
