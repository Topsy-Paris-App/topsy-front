import { notFound } from "next/navigation";
import { getMenuItem, type MenuItem } from "@/lib/api/menu";
import DishDetail from "@/components/topsy/DishDetail";

export const dynamic = "force-dynamic";

export default async function MenuItemPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  let item: MenuItem;
  try {
    item = await getMenuItem(slug);
  } catch {
    notFound();
  }
  return <DishDetail item={item} locale={locale} />;
}
