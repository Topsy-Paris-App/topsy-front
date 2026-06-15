"use client";

import { useState } from "react";
import Field from "@/components/topsy/Field";
import { submitInquiry } from "@/lib/api/contact";

const EMPTY = { prenom: "", nom: "", tel: "", email: "", cp: "", ville: "", msg: "" };

export default function TopsyContactForm() {
  const [f, setF] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof typeof EMPTY, v: string) => setF((s) => ({ ...s, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    if (!f.prenom || !f.email || !f.msg) {
      setError("Merci de renseigner au moins votre prénom, votre email et un message.");
      return;
    }
    setSubmitting(true);
    try {
      await submitInquiry({
        kind: "contact",
        full_name: `${f.prenom} ${f.nom}`.trim(),
        email: f.email,
        message: [f.msg, f.tel && `Tél : ${f.tel}`, (f.cp || f.ville) && `Lieu : ${f.cp} ${f.ville}`]
          .filter(Boolean)
          .join("\n"),
      });
      setSuccess(true);
      setF(EMPTY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Envoi impossible.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="devis__done">
        <h3>Message envoyé&nbsp;!</h3>
        <p>Merci, on revient vers vous le jour-même.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <Field label="Prénom">
          <input value={f.prenom} onChange={(e) => set("prenom", e.target.value)} required />
        </Field>
        <Field label="Nom">
          <input value={f.nom} onChange={(e) => set("nom", e.target.value)} />
        </Field>
        <Field label="Téléphone">
          <input value={f.tel} onChange={(e) => set("tel", e.target.value)} />
        </Field>
        <Field label="Email">
          <input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} required />
        </Field>
        <Field label="Code postal">
          <input value={f.cp} onChange={(e) => set("cp", e.target.value)} />
        </Field>
        <Field label="Ville">
          <input value={f.ville} onChange={(e) => set("ville", e.target.value)} />
        </Field>
      </div>
      <Field label="Message">
        <textarea rows={4} value={f.msg} onChange={(e) => set("msg", e.target.value)} required />
      </Field>
      {error && <p className="warn">{error}</p>}
      <button className="btn btn--primary" type="submit" disabled={submitting}>
        {submitting ? "envoi…" : "envoyer"}
      </button>
    </form>
  );
}
