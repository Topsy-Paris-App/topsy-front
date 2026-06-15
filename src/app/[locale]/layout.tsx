import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import ClientAuthProvider from "@/components/AuthProvider";
import CookieBanner from "@/components/CookieBanner";
import "../globals.css";

export const metadata: Metadata = {
  title: "Topsy Paris | Traiteur africain & camerounais",
  description:
    "Plats africains et camerounais faits maison, à commander et récupérer à La Courneuve.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ClientAuthProvider>
        {children}
        <CookieBanner />
      </ClientAuthProvider>
    </NextIntlClientProvider>
  );
}
