import LegalArticle from "@/components/legal/LegalArticle";
import { legalDocs } from "@/content/legal";

export default function MentionsLegalesPage() {
  return <LegalArticle doc={legalDocs["mentions-legales"]} />;
}
