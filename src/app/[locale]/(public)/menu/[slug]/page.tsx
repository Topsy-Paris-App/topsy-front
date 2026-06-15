import { getMenuItem } from "@/lib/api/menu";
import { formatCents } from "@/lib/price";
import AddToCartButton from "@/components/menu/AddToCartButton";

export const dynamic = "force-dynamic";

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getMenuItem(slug);

  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <section className="max-w-2xl mx-auto px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-primary font-bold mb-3">
          {item.category}
        </p>
        <h1 className="text-4xl lg:text-6xl font-headline text-on-surface mb-4">
          {item.name}
        </h1>
        <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
          {item.description}
        </p>
        <div className="flex items-center gap-6">
          <span className="text-2xl text-on-surface font-label">
            {formatCents(item.priceCents)}
          </span>
          <AddToCartButton item={item} />
        </div>
      </section>
    </main>
  );
}
