import PageHero from "@/components/topsy/PageHero";
import Stars from "@/components/topsy/Stars";
import { getPublishedReviews, type Review } from "@/lib/api/reviews";

export const dynamic = "force-dynamic";

const RATING = 4.75;

// Real verified testimonials (owner-confirmed).
const TESTIMONIALS = [
  {
    name: "Yolande",
    stars: 4,
    title: "Topissime",
    text: "Votre particularité réside dans la présentation soignée de vos plats, votre sérieux et bien sûr le goût des plats.",
  },
  {
    name: "Oriane",
    stars: 4.5,
    title: null,
    text: "Testé et approuvé !",
  },
];

export default async function AvisPage() {
  let reviews: Review[] = [];
  try {
    reviews = await getPublishedReviews();
  } catch {
    reviews = [];
  }

  return (
    <div>
      <PageHero kicker="ils nous adorent" title="vos avis" />
      <section className="section">
        <div className="reviews__head reviews__head--center">
          <div className="reviews__score">
            <span className="reviews__big">4,75</span>
            <span className="reviews__out">/5</span>
          </div>
          <div className="reviews__meta">
            <Stars value={RATING} size={24} />
            <p>Note moyenne · avis vérifiés</p>
          </div>
        </div>

        <div className="reviews__grid reviews__grid--all">
          {TESTIMONIALS.map((r) => (
            <figure className="review" key={r.name}>
              <Stars value={r.stars} size={16} />
              {r.title && <strong className="review__title">{r.title}</strong>}
              <blockquote>« {r.text} »</blockquote>
              <figcaption>{r.name}</figcaption>
            </figure>
          ))}
          {reviews.map((r) => (
            <figure className="review" key={r.id}>
              <Stars value={r.rating} size={16} />
              {r.title && <strong className="review__title">{r.title}</strong>}
              <blockquote>« {r.body} »</blockquote>
              <figcaption>{r.author_name}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
