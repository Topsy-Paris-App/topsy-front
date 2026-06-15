export default function AdminDashboard() {
  return (
    <>
      <h1 className="admin__title">Tableau de bord</h1>
      <div className="kpis">
        <div className="kpi">
          <span>Chiffre d&apos;affaires</span>
          <b>—</b>
        </div>
        <div className="kpi">
          <span>Commandes</span>
          <b>—</b>
        </div>
        <div className="kpi">
          <span>Panier moyen</span>
          <b>—</b>
        </div>
        <div className="kpi">
          <span>Note moyenne</span>
          <b>4,75/5</b>
        </div>
      </div>
      <h2 className="admin__sub">Dernières commandes</h2>
      <p className="muted-note">
        L&apos;API n&apos;expose pas encore la liste globale des commandes (uniquement les commandes du
        client connecté). Les indicateurs s&apos;afficheront dès que l&apos;endpoint admin sera disponible.
      </p>
    </>
  );
}
