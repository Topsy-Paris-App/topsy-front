export default function AdminLeads() {
  return (
    <>
      <h1 className="admin__title">Leads traiteur</h1>
      <p className="muted-note">
        Les demandes de devis traiteur sont envoyées par email (<code>POST /contact</code> avec{" "}
        <code>kind:&apos;catering&apos;</code>). L&apos;API n&apos;expose pas encore de liste consultable :
        cette vue se remplira dès qu&apos;un endpoint de leads sera ajouté.
      </p>
    </>
  );
}
