import { Link } from "@/i18n/navigation";
import PageHero from "@/components/topsy/PageHero";

const ZONES = [
  { name: "Zone verte", radius: "≤ 20 km", fee: "20 €", min: "45 €" },
  { name: "Zone orange", radius: "≤ 40 km", fee: "30 €", min: "60 €" },
  { name: "Zone bleue", radius: "≤ 60 km", fee: "45 €", min: "90 €" },
];

export default function LivraisonPage() {
  return (
    <div>
      <PageHero kicker="livraison & click and collect" title="commander, mode d'emploi" />
      <section className="section">
        <div className="info-grid">
          <div className="info-card">
            <h3>Livraison Île-de-France</h3>
            <ul className="ticks">
              <li>
                <b>Zone verte</b> (≤ 20 km) : 20 € de livraison, minimum 45 €
              </li>
              <li>
                <b>Zone orange</b> (≤ 40 km) : 30 € de livraison, minimum 60 €
              </li>
              <li>
                <b>Zone bleue</b> (≤ 60 km) : 45 € de livraison, minimum 90 €
              </li>
              <li>Créneaux Mar–Dim 11h–14h30 · 17h–20h</li>
              <li>Commande la veille</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>Retrait à La Courneuve</h3>
            <ul className="ticks">
              <li>Gratuit, sans minimum</li>
              <li>10–12 mail de l&apos;Égalité, 93120 La Courneuve</li>
              <li>Aux mêmes créneaux que la livraison</li>
              <li>Commande prête à l&apos;heure choisie</li>
            </ul>
            <Link href="/menu" className="btn btn--outline btn--sm">
              commander en retrait
            </Link>
          </div>
        </div>

        <div className="zone-table">
          {ZONES.map((z) => (
            <div className="zone-row" key={z.name}>
              <span className="zone-row__name">{z.name}</span>
              <span className="zone-row__radius">{z.radius}</span>
              <span className="zone-row__fee">livraison {z.fee}</span>
              <span className="zone-row__min">minimum {z.min}</span>
            </div>
          ))}
        </div>

        <p className="center-cta">
          <Link href="/menu" className="btn btn--primary">
            voir la carte
          </Link>
        </p>
      </section>
    </div>
  );
}
