"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import Field from "@/components/topsy/Field";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [updated, setUpdated] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setUpdated(true);
  }

  return (
    <div className="section narrow auth">
      <h1 className="page-title page-title--lg">nouveau mot de passe</h1>
      {updated ? (
        <div className="auth__form">
          <p className="muted-note">
            Votre mot de passe a été mis à jour. Vous pouvez maintenant vous
            connecter.
          </p>
          <Link className="btn btn--primary block" href="/auth/login">
            se connecter
          </Link>
        </div>
      ) : (
        <form className="auth__form" onSubmit={handleSubmit}>
          <Field label="Nouveau mot de passe" hint="8 caractères minimum">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>
          <Field label="Confirmer le mot de passe">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>
          {error && <p className="warn">{error}</p>}
          <button className="btn btn--primary block" type="submit">
            mettre à jour
          </button>
          <p className="auth__switch">
            <Link href="/auth/login">Retour à la connexion</Link>
          </p>
        </form>
      )}
    </div>
  );
}
