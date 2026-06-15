import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <main className="min-h-screen bg-background">
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pt-24 pb-16 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-4">
          {t("subtitle")}
        </p>
        <h1 className="text-5xl lg:text-7xl font-headline text-on-surface mb-6">
          {t("title")}
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed max-w-xl mx-auto mb-10">
          {t("intro")}
        </p>
        <Link
          href="/menu"
          className="inline-flex items-center justify-center gold-gradient text-on-primary text-xs font-label font-semibold tracking-widest uppercase px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
        >
          {t("cta")}
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-24">
        <div className="bg-surface-container-low p-8 rounded-xl">
          <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">
            {t("pickupTitle")}
          </p>
          <p className="text-on-surface text-lg font-label">{t("pickupAddress")}</p>
        </div>
      </section>
    </main>
  );
}
