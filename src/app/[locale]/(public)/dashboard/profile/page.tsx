"use client";

import { useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { getMe, updateMe } from "@/lib/api/users";
import Field from "@/components/topsy/Field";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [f, setF] = useState({ first_name: "", last_name: "", phone: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof typeof f, v: string) => setF((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      router.replace("/auth/login");
      return;
    }
    getMe()
      .then((me) =>
        setF({ first_name: me.first_name ?? "", last_name: me.last_name ?? "", phone: me.phone ?? "" }),
      )
      .catch(() => setError("Impossible de charger votre profil."));
  }, [user, isLoading, router]);

  if (isLoading || !user) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);
    try {
      await updateMe(f);
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enregistrement impossible.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="section narrow">
      <Link className="link-back" href="/dashboard">
        ← mes commandes
      </Link>
      <h1 className="page-title">mon profil</h1>
      <form className="profile-form" onSubmit={submit}>
        <div className="form-grid">
          <Field label="Prénom">
            <input value={f.first_name} onChange={(e) => set("first_name", e.target.value)} />
          </Field>
          <Field label="Nom">
            <input value={f.last_name} onChange={(e) => set("last_name", e.target.value)} />
          </Field>
        </div>
        <Field label="Téléphone">
          <input value={f.phone} onChange={(e) => set("phone", e.target.value)} placeholder="07 87 75 96 10" />
        </Field>
        {error && <p className="warn">{error}</p>}
        {saved && <p className="muted-note">Profil enregistré.</p>}
        <button className="btn btn--primary" type="submit" disabled={saving}>
          {saving ? "enregistrement…" : "enregistrer"}
        </button>
      </form>
    </div>
  );
}
