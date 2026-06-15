"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getOrder, type Order } from "@/lib/api/orders";
import { formatCents } from "@/lib/price";

function SuccessContent() {
  const t = useTranslations("success");
  const orderId = useSearchParams().get("orderId");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;
    let active = true;
    const interval = setInterval(async () => {
      try {
        const fetched = await getOrder(orderId);
        if (!active) return;
        setOrder(fetched);
        if (fetched.status !== "pending") clearInterval(interval);
      } catch {
        // keep polling
      }
    }, 2000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [orderId]);

  return (
    <section className="max-w-xl mx-auto px-6 lg:px-8 text-center">
      <h1 className="text-4xl lg:text-6xl font-headline text-on-surface mb-6">
        {t("title")}
      </h1>
      {order ? (
        <>
          <p className="text-on-surface-variant mb-2">
            {t("status")}: {order.status}
          </p>
          <p className="text-on-surface text-xl font-label">
            {formatCents(order.subtotalCents)}
          </p>
        </>
      ) : (
        <p className="text-on-surface-variant">{t("loading")}</p>
      )}
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <Suspense>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
