import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/contact/ContactForm";

export default async function ContactPage() {
  const t = await getTranslations("contact");

  const subjects = [
    t("subjectOrder"),
    t("subjectCatering"),
    t("subjectOther"),
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <section className="max-w-2xl mx-auto px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-primary font-bold mb-3">
          {t("subtitle")}
        </p>
        <h1 className="text-4xl lg:text-6xl font-headline text-on-surface mb-6">
          {t("title")}
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
          {t("intro")}
        </p>

        <div className="bg-surface-container-low p-8 rounded-xl">
          <ContactForm subjects={subjects} />
        </div>
      </section>
    </main>
  );
}
