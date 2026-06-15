import type { LegalDoc } from "@/content/legal";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/topsy/PageHero";

export default function LegalArticle({ doc }: { doc: LegalDoc }) {
  return (
    <div>
      <PageHero kicker="informations" title={doc.title} />
      <section className="section narrow legal">
        <p className="muted-note">Dernière mise à jour : {doc.updated}</p>
        {doc.blocks.map((block, i) =>
          block.type === "h" ? (
            <h2 key={i} className="legal__h">
              {block.text}
            </h2>
          ) : (
            <p key={i}>{block.text}</p>
          ),
        )}
        <p className="center-cta">
          <Link href="/" className="btn btn--outline btn--sm">
            retour à l&apos;accueil
          </Link>
        </p>
      </section>
    </div>
  );
}
