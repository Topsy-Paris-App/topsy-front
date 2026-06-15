"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import Field from "@/components/topsy/Field";
import { useAuth } from "@/lib/auth/AuthContext";

const REDIRECT: Record<string, string> = {
  customer: "/dashboard",
  admin: "/admin",
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (!agreeTerms) {
      setError("Merci d'accepter les conditions générales.");
      return;
    }
    setIsLoading(true);
    try {
      const user = await register(firstName, lastName, email, password);
      router.push(REDIRECT[user.role] ?? "/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Inscription impossible.";
      setError(
        /\b429\b|too many|rate limit/i.test(message)
          ? "Trop de tentatives, réessayez dans une minute."
          : message,
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="section narrow auth">
      <h1 className="page-title page-title--lg">créer un compte</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field label="Prénom">
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Aïcha"
              required
            />
          </Field>
          <Field label="Nom">
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="M."
              required
            />
          </Field>
        </div>
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@email.fr"
            required
          />
        </Field>
        <Field label="Mot de passe" hint="8 caractères minimum">
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
        <label className="checkbox">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
          />
          <span>
            J'accepte les <Link href="/cgv">conditions générales</Link> et la{" "}
            <Link href="/confidentialite">politique de confidentialité</Link>.
          </span>
        </label>
        {error && <p className="warn">{error}</p>}
        <button className="btn btn--primary block" type="submit" disabled={isLoading}>
          {isLoading ? "création…" : "créer mon compte"}
        </button>
        <p className="auth__switch">
          Déjà un compte ? <Link href="/auth/login">Se connecter</Link>
        </p>
      </form>
    </div>
  );
}
