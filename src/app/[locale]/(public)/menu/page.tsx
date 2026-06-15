import { getTranslations } from "next-intl/server";
import { getMenu } from "@/lib/api/menu";
import { formatCents } from "@/lib/price";
import AddToCartButton from "@/components/menu/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const t = await getTranslations("menu");
  const categories = await getMenu();

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <section className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl lg:text-6xl font-headline text-on-surface mb-12">
          {t("title")}
        </h1>

        {categories.map((category) => (
          <div key={category.id} className="mb-12">
            <h2 className="text-2xl font-headline text-primary mb-6">
              {category.name}
            </h2>
            <ul className="space-y-4">
              {category.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-4 bg-surface-container-low p-5 rounded-xl"
                >
                  <div>
                    <p className="text-on-surface font-label font-semibold">
                      {item.name}
                    </p>
                    <p className="text-on-surface-variant text-sm">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-on-surface font-label">
                      {formatCents(item.priceCents)}
                    </span>
                    <AddToCartButton item={item} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
