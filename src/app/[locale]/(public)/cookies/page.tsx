import LegalArticle from "@/components/legal/LegalArticle";
import { legalDocs } from "@/content/legal";

export default function CookiesPage() {
  return <LegalArticle doc={legalDocs.cookies} />;
}
