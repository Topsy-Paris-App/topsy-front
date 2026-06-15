export default function AdminOrders() {
  return (
    <>
      <h1 className="admin__title">Commandes</h1>
      <p className="muted-note">
        Aucune liste admin des commandes pour l&apos;instant : l&apos;API expose seulement les commandes du
        client connecté (<code>GET /orders/me</code>). Cette vue se remplira dès qu&apos;un endpoint admin
        sera ajouté côté API.
      </p>
    </>
  );
}
