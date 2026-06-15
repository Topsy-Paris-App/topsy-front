"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Field from "@/components/topsy/Field";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="section narrow auth">
      <h1 className="page-title page-title--lg">mot de passe oublié</h1>
      {sent ? (
        <div className="auth__form">
          <p className="muted-note">
            Si un compte existe pour <b>{email}</b>, vous recevrez un lien de
            réinitialisation par email. Pensez à vérifier vos spams.
          </p>
          <p className="auth__switch">
            <Link href="/auth/login">Retour à la connexion</Link>
          </p>
        </div>
      ) : (
        <form className="auth__form" onSubmit={handleSubmit}>
          <p className="muted-note">
            Entrez votre email, on vous envoie un lien pour choisir un nouveau
            mot de passe.
          </p>
          <Field label="Email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@email.fr"
              required
            />
          </Field>
          <button className="btn btn--primary block" type="submit">
            envoyer le lien
          </button>
          <p className="auth__switch">
            <Link href="/auth/login">Retour à la connexion</Link>
          </p>
        </form>
      )}
    </div>
  );
}
