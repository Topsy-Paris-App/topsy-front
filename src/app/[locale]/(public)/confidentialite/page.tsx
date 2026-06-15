import LegalArticle from "@/components/legal/LegalArticle";
import { legalDocs } from "@/content/legal";

export default function ConfidentialitePage() {
  return <LegalArticle doc={legalDocs.confidentialite} />;
}
