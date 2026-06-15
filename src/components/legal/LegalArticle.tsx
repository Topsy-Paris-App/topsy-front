import type { LegalDoc } from "@/content/legal";

export default function LegalArticle({ doc }: { doc: LegalDoc }) {
  return (
    <main className="min-h-screen bg-background pt-24 pb-20">
      <section className="max-w-2xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl font-headline text-on-surface mb-2">{doc.title}</h1>
        <p className="text-sm text-on-surface-variant mb-10">
          Dernière mise à jour : {doc.updated}
        </p>
        <div className="space-y-5">
          {doc.blocks.map((block, i) =>
            block.type === "h" ? (
              <h2
                key={i}
                className="text-xl font-headline text-on-surface pt-4"
              >
                {block.text}
              </h2>
            ) : (
              <p key={i} className="text-on-surface-variant leading-relaxed">
                {block.text}
              </p>
            ),
          )}
        </div>
      </section>
    </main>
  );
}
