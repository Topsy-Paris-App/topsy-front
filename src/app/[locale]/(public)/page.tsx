import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getMenu } from "@/lib/api/menu";
import DishCard from "@/components/topsy/DishCard";
import HowToOrder from "@/components/topsy/HowToOrder";
import Stars from "@/components/topsy/Stars";

export const dynamic = "force-dynamic";

const RATING = 4.75;

const ARGS = [
  { k: "100 % Halal", v: "viandes certifiées" },
  { k: "Bio & frais", v: "sourcés du jour" },
  { k: "Cuisiné le jour-même", v: "préparé chaque matin" },
  { k: "Éco-responsable", v: "contenants biodégradables" },
];

// Real verified testimonials (owner-confirmed).
const REVIEWS = [
  { name: "Yolande", stars: 4, text: "Votre particularité réside dans la présentation soignée de vos plats, votre sérieux et bien sûr le goût des plats." },
  { name: "Oriane", stars: 4.5, text: "Testé et approuvé !" },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const categories = await getMenu();
  const signatures = categories
    .flatMap((c) => c.items)
    .filter((i) => i.is_signature && i.is_available)
    .slice(0, 8);

  return (
    <>
      <section className="hero hero--split">
        <div className="hero__inner hero__inner--split">
          <div className="hero__col">
            <span className="kicker kicker--light">Traiteur africain · La Courneuve (93)</span>
            <h1 className="hero__title">
              la cuisine <span className="hero__hl">africaine</span> authentique.
            </h1>
            <p className="hero__sub">
              Cuisine camerounaise familiale, <b>100 % halal</b>, <b>bio &amp; fraîche</b> — cuisinée le
              jour-même, dressée comme au restaurant, livrée en Île-de-France ou à retirer à La Courneuve.
            </p>
            <div className="hero__ctas">
              <Link className="btn btn--primary" href="/menu">
                voir la carte
              </Link>
              <Link className="btn btn--ghost" href="/menu">
                click &amp; collect
              </Link>
            </div>
            <div className="ratingchip">
              <strong>4,75</strong>
              <span className="ratingchip__body">
                <Stars value={RATING} size={15} />
                <span className="ratingchip__count">/5 · avis vérifiés</span>
              </span>
            </div>
          </div>
          <div className="hero__photoframe">
            <Image
              src="/images/hero.jpg"
              alt="Plat camerounais Topsy"
              fill
              priority
              sizes="(max-width: 980px) 100vw, 480px"
              style={{ objectFit: "cover", borderRadius: 14 }}
            />
            <span className="hero__sticker">
              cuisiné
              <br />
              le jour-même
            </span>
          </div>
        </div>
      </section>

      <section className="args">
        <div className="args__row">
          {ARGS.map((a, i) => (
            <span key={a.k} style={{ display: "contents" }}>
              {i > 0 && <span className="args__sep" aria-hidden="true" />}
              <span className="args__item">
                <span className="args__k">{a.k}</span>
                <span className="args__v">{a.v}</span>
              </span>
            </span>
          ))}
        </div>
      </section>

      <section className="section signatures">
        <header className="heading">
          <span className="kicker">à la carte</span>
          <h2 className="heading__title">nos plats signature</h2>
          <p className="heading__sub">
            Une poignée de classiques camerounais qui font notre réputation. La carte complète en compte
            bien plus.
          </p>
        </header>
        <div className="carousel">
          {signatures.map((item) => (
            <div className="carousel__cell" key={item.id}>
              <DishCard item={item} locale={locale} />
            </div>
          ))}
        </div>
        <div className="signatures__more">
          <Link className="btn btn--outline" href="/menu">
            voir toute la carte →
          </Link>
        </div>
      </section>

      <HowToOrder />

      <section className="section traiteur-teaser-wrap">
        <div className="traiteur-teaser">
          <div className="traiteur-teaser__art">
            <div className="traiteur__photoframe">
              <Image
                src="/images/crevettes.jpg"
                alt="Traiteur Topsy"
                fill
                sizes="(max-width: 980px) 100vw, 480px"
                style={{ objectFit: "cover", borderRadius: 14 }}
              />
            </div>
          </div>
          <div className="traiteur-teaser__body">
            <span className="kicker kicker--light">familles · entreprises · événementiel</span>
            <h2 className="traiteur-teaser__title">on régale aussi vos grandes tablées</h2>
            <p className="traiteur-teaser__sub">
              Baptêmes, séminaires, mariages : plateaux XL, buckets et apéro-dînatoires façon Topsy,
              dressés et livrés chauds. Devis le jour-même.
            </p>
            <ul className="ticks">
              <li>Plateaux à partager dès 6 personnes</li>
              <li>Formules sur mesure pour 10–12 et plus</li>
              <li>Livraison &amp; mise en place en Île-de-France</li>
            </ul>
            <Link className="btn btn--outline-light" href="/traiteur">
              découvrir le traiteur
            </Link>
          </div>
        </div>
      </section>

      <section className="section reviews">
        <div className="reviews__head">
          <div className="reviews__score">
            <span className="reviews__big">4,75</span>
            <span className="reviews__out">/5</span>
          </div>
          <div className="reviews__meta">
            <Stars value={RATING} size={22} />
            <p>Note moyenne · avis vérifiés</p>
          </div>
        </div>
        <div className="reviews__grid">
          {REVIEWS.map((r) => (
            <figure className="review" key={r.name}>
              <Stars value={r.stars} size={16} />
              <blockquote>« {r.text} »</blockquote>
              <figcaption>{r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
