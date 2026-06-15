import PageHero from "@/components/topsy/PageHero";
import Photo from "@/components/topsy/Photo";
import TopsyContactForm from "@/components/contact/TopsyContactForm";

const INFO: [string, string][] = [
  ["Adresse", "10–12 mail de l'Égalité, 93120 La Courneuve"],
  ["Téléphone", "07 87 75 96 10"],
  ["Email", "topsy.par@gmail.com"],
  ["Horaires", "Mar–Sam 11h–21h · Dim 11h–14h"],
];

export default function ContactPage() {
  return (
    <div>
      <PageHero kicker="on vous répond vite" title="contact" />
      <section className="section">
        <div className="contact-grid">
          <TopsyContactForm />
          <aside className="contact-info">
            <div className="contact-map">
              <Photo imageUrl="/images/pastels.jpg" alt="Topsy · La Courneuve" radius={14} />
            </div>
            <ul className="contact-list">
              {INFO.map(([k, v]) => (
                <li key={k}>
                  <span>{k}</span>
                  <b>{v}</b>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
