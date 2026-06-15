import { Link } from "@/i18n/navigation";
import PageHero from "@/components/topsy/PageHero";
import Photo from "@/components/topsy/Photo";

const VALUES: [string, string][] = [
  ["100 % halal", "Viandes certifiées, sans compromis."],
  ["Bio & frais", "Produits sourcés et cuisinés le jour-même."],
  ["Fait maison", "Recettes familiales, rien d'industriel."],
  ["Éco-responsable", "Contenants biodégradables, dressage soigné."],
];

export default function AboutPage() {
  return (
    <div>
      <PageHero kicker="notre histoire" title="deux sœurs, une cuisine de cœur" />
      <section className="section narrow about">
        <div className="about__lead-wrap">
          <div className="about__photo">
            <Photo imageUrl="/images/samoussas.jpg" alt="Cuisine Topsy" radius={16} />
          </div>
          <div className="about__lead">
            <p>
              Topsy, c&apos;est l&apos;histoire de <b>deux sœurs camerounaises</b>, originaires de Fosses
              (95), qui ont grandi entre les marmites familiales et l&apos;envie de partager, à Paris, les
              saveurs de leur enfance.
            </p>
            <p>
              « Topsy » est le nom d&apos;un <b>plat camerounais</b> — un clin d&apos;œil à cette cuisine
              généreuse qui rassemble autour de la table.
            </p>
          </div>
        </div>
        <div className="about__values">
          {VALUES.map(([t, d]) => (
            <div className="value" key={t}>
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <p className="about__atelier">
          Notre cuisine se trouve au <b>10–12 mail de l&apos;Égalité, à La Courneuve (93)</b>, d&apos;où
          partent chaque jour vos commandes, cuisinées avec la même attention que pour la famille.
        </p>
        <p className="center-cta">
          <Link href="/menu" className="btn btn--primary">
            découvrir la carte
          </Link>
        </p>
      </section>
    </div>
  );
}
