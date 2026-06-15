import LegalArticle from "@/components/legal/LegalArticle";
import { legalDocs } from "@/content/legal";

export default function CgvPage() {
  return <LegalArticle doc={legalDocs.cgv} />;
}
