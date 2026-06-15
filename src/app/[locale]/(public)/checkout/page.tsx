"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useCart } from "@/lib/cart/store";
import { createOrder } from "@/lib/api/orders";

const schema = z.object({
  fulfillment: z.enum(["delivery", "pickup"]),
  customer_name: z.string().min(1),
  customer_email: z.string().email(),
  customer_phone: z.string().min(1),
  address: z.string().optional(),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  const t = useTranslations("checkout");
  const router = useRouter();
  const { items, clear } = useCart();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fulfillment: "pickup" },
  });

  const fulfillment = watch("fulfillment");

  async function onSubmit(values: FormValues) {
    const order = await createOrder({
      ...values,
      items: items.map((i) => ({ item_id: i.itemId, qty: i.qty, options: i.options })),
    });
    clear();
    router.push(`/checkout/success?orderId=${order.id}`);
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <section className="max-w-xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl lg:text-6xl font-headline text-on-surface mb-12">
          {t("title")}
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <select
            {...register("fulfillment")}
            className="w-full bg-surface-container-high rounded-lg p-4 text-on-surface outline-none"
          >
            <option value="pickup">{t("pickup")}</option>
            <option value="delivery">{t("delivery")}</option>
          </select>

          <input
            {...register("customer_name")}
            placeholder={t("name")}
            className="w-full bg-surface-container-high rounded-lg p-4 text-on-surface outline-none"
          />
          <input
            {...register("customer_email")}
            type="email"
            placeholder={t("email")}
            className="w-full bg-surface-container-high rounded-lg p-4 text-on-surface outline-none"
          />
          <input
            {...register("customer_phone")}
            placeholder={t("phone")}
            className="w-full bg-surface-container-high rounded-lg p-4 text-on-surface outline-none"
          />

          {fulfillment === "delivery" && (
            <input
              {...register("address")}
              placeholder={t("address")}
              className="w-full bg-surface-container-high rounded-lg p-4 text-on-surface outline-none"
            />
          )}

          <textarea
            {...register("note")}
            placeholder={t("note")}
            rows={3}
            className="w-full bg-surface-container-high rounded-lg p-4 text-on-surface outline-none resize-none"
          />

          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className="w-full gold-gradient text-on-primary py-4 rounded-lg font-label font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? t("submitting") : t("submit")}
          </button>
        </form>
      </section>
    </main>
  );
}
