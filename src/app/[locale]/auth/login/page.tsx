"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import Field from "@/components/topsy/Field";
import { useAuth } from "@/lib/auth/AuthContext";

const REDIRECT: Record<string, string> = {
  customer: "/dashboard",
  admin: "/admin",
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const redirectTo = searchParams.get("redirect") ?? "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const user = await login(email, password, rememberMe);
      router.push(redirectTo || (REDIRECT[user.role] ?? "/dashboard"));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Connexion impossible.";
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
      <h1 className="page-title page-title--lg">se connecter</h1>
      <form className="auth__form" onSubmit={handleSubmit}>
        <Field label="Email">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vous@email.fr"
            required
          />
        </Field>
        <Field label="Mot de passe">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </Field>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span>Rester connecté·e</span>
        </label>
        <Link className="auth__forgot" href="/auth/forgot-password">
          Mot de passe oublié ?
        </Link>
        {error && <p className="warn">{error}</p>}
        <button className="btn btn--primary block" type="submit" disabled={isLoading}>
          {isLoading ? "connexion…" : "se connecter"}
        </button>
        <p className="auth__switch">
          Pas de compte ? <Link href="/auth/register">Créer un compte</Link>
        </p>
      </form>
    </div>
  );
}
