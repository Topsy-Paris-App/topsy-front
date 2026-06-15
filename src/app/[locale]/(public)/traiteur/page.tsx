import PageHero from "@/components/topsy/PageHero";
import Photo from "@/components/topsy/Photo";
import CtxTabs from "@/components/traiteur/CtxTabs";
import Kola from "@/components/traiteur/Kola";
import { TRAITEUR_FORMULAS } from "@/content/traiteur";

const euro = (n: number) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });

const GALLERY = ["/images/aperitif.jpg", "/images/samoussas.jpg", "/images/crevettes.jpg", "/images/pastels.jpg"];

export default function TraiteurPage() {
  return (
    <div className="traiteur-page">
      <PageHero
        kicker="traiteur & événementiel"
        title="on régale vos grandes tablées"
        sub="Familles, entreprises, mariages : une cuisine camerounaise généreuse, dressée et livrée chaude partout en Île-de-France."
      />

      <section className="section">
        <h2 className="block-title">pour quelle occasion ?</h2>
        <CtxTabs />
      </section>

      <section className="section">
        <h2 className="block-title">nos formules à partager</h2>
        <div className="formula-grid">
          {TRAITEUR_FORMULAS.map((fm) => (
            <article className="formula" key={fm.name}>
              <div className="formula__media">
                <Photo imageUrl="/images/aperitif.jpg" alt={fm.name} radius={14} />
              </div>
              <div className="formula__body">
                <h3>{fm.name}</h3>
                <span className="formula__serves">{fm.serves}</span>
                <p>{fm.desc}</p>
                <ul className="formula__includes">
                  {fm.includes.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
                <span className="formula__from">
                  à partir de <b>{euro(fm.from)}/pers.</b>
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section gallery-sec">
        <h2 className="block-title">en images</h2>
        <div className="gallery">
          {GALLERY.map((src) => (
            <div className="gallery__cell" key={src}>
              <Photo imageUrl={src} alt="Événement Topsy" radius={14} />
            </div>
          ))}
        </div>
      </section>

      <section className="section devis-sec">
        <div className="devis">
          <div className="devis__intro">
            <span className="kicker">devis · sans engagement</span>
            <h2 className="block-title">estimez votre événement avec Kola</h2>
            <p>
              Réglez les curseurs : Kola calcule une <b>estimation indicative</b> en direct. Le devis
              définitif est établi sur demande, renvoyé le jour-même. Pour 40 convives et plus, prévenez-nous
              au moins 10 jours à l&apos;avance.
            </p>
          </div>
          <Kola />
        </div>
      </section>
    </div>
  );
}
