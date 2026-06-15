"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCart, subtotalCents } from "@/lib/cart/store";
import { formatCents } from "@/lib/price";

export default function CartPage() {
  const t = useTranslations("cart");
  const { items, updateQty, remove } = useCart();
  const subtotal = subtotalCents(items);

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <section className="max-w-2xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl lg:text-6xl font-headline text-on-surface mb-12">
          {t("title")}
        </h1>

        {items.length === 0 ? (
          <p className="text-on-surface-variant">{t("empty")}</p>
        ) : (
          <>
            <ul className="space-y-4 mb-8">
              {items.map((item) => (
                <li
                  key={item.itemId}
                  className="flex items-center justify-between gap-4 bg-surface-container-low p-5 rounded-xl"
                >
                  <div>
                    <p className="text-on-surface font-label font-semibold">
                      {item.name}
                    </p>
                    <p className="text-on-surface-variant text-sm">
                      {formatCents(item.unitPriceCents)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <input
                      type="number"
                      min={0}
                      value={item.qty}
                      onChange={(e) =>
                        updateQty(item.itemId, Number(e.target.value))
                      }
                      className="w-16 bg-surface-container-high text-on-surface rounded-lg p-2 text-center outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => remove(item.itemId)}
                      className="text-error text-sm"
                    >
                      {t("remove")}
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between mb-8">
              <span className="text-on-surface-variant uppercase tracking-widest text-xs font-bold">
                {t("subtotal")}
              </span>
              <span className="text-on-surface text-xl font-label">
                {formatCents(subtotal)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gold-gradient text-on-primary text-xs font-label font-semibold tracking-widest uppercase px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
            >
              {t("checkout")}
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
