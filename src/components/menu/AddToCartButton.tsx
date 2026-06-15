"use client";

import { useTranslations } from "next-intl";
import { useCart } from "@/lib/cart/store";
import type { MenuItem } from "@/lib/api/menu";

interface Props {
  item: MenuItem;
}

export default function AddToCartButton({ item }: Props) {
  const t = useTranslations("menu");
  const add = useCart((s) => s.add);

  return (
    <button
      type="button"
      onClick={() =>
        add({
          itemId: item.id,
          name: item.name,
          unitPriceCents: item.priceCents,
          qty: 1,
        })
      }
      disabled={!item.isAvailable}
      className="gold-gradient text-on-primary text-xs font-label font-semibold tracking-widest uppercase px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {t("addToCart")}
    </button>
  );
}
