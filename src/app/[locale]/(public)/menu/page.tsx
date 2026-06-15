import { getMenu } from "@/lib/api/menu";
import MenuView from "@/components/topsy/MenuView";

export const dynamic = "force-dynamic";

export default async function MenuPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const categories = await getMenu();
  return <MenuView categories={categories} locale={locale} />;
}
