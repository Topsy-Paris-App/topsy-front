/**
 * Textes légaux — Topsy Paris.
 *
 * ⚠️ MODÈLES à compléter et à FAIRE VALIDER PAR UN JURISTE avant mise en production,
 * en particulier les CGV (vente en ligne de denrées alimentaires). Les champs entre
 * {{accolades}} doivent être remplis avec les informations réelles de l'entreprise.
 *
 * Bases : LCEN (art. 6), Code de la consommation, RGPD (Règlement UE 2016/679),
 * directive ePrivacy / recommandations CNIL pour les cookies.
 *
 * Source unique de vérité : modifier ce fichier met à jour les 4 pages légales.
 */

export type LegalBlock = { type: "h" | "p"; text: string };

export type LegalDoc = {
  slug: "mentions-legales" | "cgv" | "confidentialite" | "cookies";
  title: string;
  updated: string; // "À COMPLÉTER" tant que non daté par l'éditeur
  blocks: LegalBlock[];
};

const h = (text: string): LegalBlock => ({ type: "h", text });
const p = (text: string): LegalBlock => ({ type: "p", text });

export const mentionsLegales: LegalDoc = {
  slug: "mentions-legales",
  title: "Mentions légales",
  updated: "15 juin 2026",
  blocks: [
    p(
      "Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), les présentes mentions légales sont portées à la connaissance des utilisateurs du site topsy-paris.fr.",
    ),
    h("Éditeur du site"),
    p(
      "Le site topsy-paris.fr est édité par TOPSY PARIS, SAS (Société par Actions Simplifiée) au capital de {{CAPITAL}} euros, dont le siège social est situé 66 avenue Henri Barbusse, 95470 Fosses.",
    ),
    p(
      "SIRET : 91155023400015 — RCS Pontoise 911 550 234 — N° TVA intracommunautaire : FR39911550234.",
    ),
    p(
      "Adresse de l'établissement (retrait / click & collect) : 10-12 mail de l'Égalité, 93120 La Courneuve.",
    ),
    p("Téléphone : 06 59 92 14 82 — E-mail : topsy.par@gmail.com."),
    p("Directeur / Directrice de la publication : Blandine SIMON BENGUI."),
    h("Hébergement"),
    p(
      "Site (front) hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com.",
    ),
    p(
      "Serveur applicatif et base de données (back) hébergés par Heroku / Salesforce, Inc., 415 Mission Street, San Francisco, CA 94105, États-Unis — heroku.com. Région d'hébergement des données : Union européenne et États-Unis (Vercel, Heroku), transferts encadrés par les clauses contractuelles types de la Commission européenne.",
    ),
    h("Propriété intellectuelle"),
    p(
      "L'ensemble des contenus présents sur le site (textes, photographies des plats, logos, marque « Topsy »…) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de TOPSY PARIS ou de ses partenaires. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.",
    ),
    h("Données personnelles et cookies"),
    p(
      "Le traitement des données personnelles est décrit dans la Politique de confidentialité. L'utilisation des cookies est décrite dans la Politique cookies. Vous pouvez exercer vos droits en écrivant à topsy.par@gmail.com.",
    ),
    h("Médiation de la consommation"),
    p(
      "Conformément à l'article L612-1 du Code de la consommation, le consommateur peut recourir gratuitement au médiateur de la consommation : {{NOM_MEDIATEUR}} — {{ADRESSE_OU_SITE_MEDIATEUR}}.",
    ),
  ],
};

export const cgv: LegalDoc = {
  slug: "cgv",
  title: "Conditions générales de vente",
  updated: "15 juin 2026",
  blocks: [
    p(
      "⚠️ Modèle à faire valider par un juriste avant publication. Les présentes conditions générales de vente (CGV) régissent les ventes de produits alimentaires réalisées en ligne sur le site topsy-paris.fr, en livraison ou en retrait sur place (click & collect).",
    ),
    h("Article 1 — Vendeur"),
    p(
      "Les produits sont vendus par TOPSY PARIS, SAS (Société par Actions Simplifiée), SIRET 91155023400015, dont le siège est situé 66 avenue Henri Barbusse, 95470 Fosses, ci-après « le Vendeur ». Contact : topsy.par@gmail.com — 06 59 92 14 82.",
    ),
    h("Article 2 — Produits"),
    p(
      "Les produits proposés sont des denrées alimentaires préparées (plats cuisinés, plateaux à partager, produits surgelés). Les photographies et descriptions sont fournies à titre indicatif et n'engagent pas le Vendeur au-delà des informations légales obligatoires (notamment les allergènes, indiqués sur chaque fiche produit).",
    ),
    h("Article 3 — Prix"),
    p(
      "Les prix sont indiqués en euros (EUR), toutes taxes comprises (TTC). Les frais de livraison éventuels sont précisés avant la validation de la commande. Le Vendeur se réserve le droit de modifier ses prix à tout moment, le prix applicable étant celui en vigueur au moment de la commande.",
    ),
    h("Article 4 — Commande"),
    p(
      "La commande est validée après acceptation des présentes CGV et confirmation du paiement. Pour la livraison, un montant minimum de commande de 45 € s'applique. Le Vendeur peut refuser ou annuler une commande en cas de litige, d'indisponibilité ou de zone non desservie.",
    ),
    h("Article 5 — Paiement"),
    p(
      "Le paiement s'effectue en ligne par carte bancaire via le prestataire de paiement sécurisé SumUp. Le Vendeur n'a jamais accès aux données complètes de la carte. La commande est traitée après confirmation du paiement par SumUp.",
    ),
    h("Article 6 — Livraison et retrait"),
    p(
      "Livraison : dans les zones desservies (Île-de-France, jusqu'à 60 km de La Courneuve (zones verte ≤20 km, orange ≤40 km, bleue ≤60 km)), selon les frais et délais indiqués lors de la commande. Retrait (click & collect) : au 10-12 mail de l'Égalité, 93120 La Courneuve, aux horaires d'ouverture Mar–Sam 11h–21h, Dim 11h–14h. Le client doit veiller au respect de la chaîne du froid après réception ou retrait.",
    ),
    h("Article 7 — Droit de rétractation"),
    p(
      "Conformément à l'article L221-28 3° et 4° du Code de la consommation, le droit de rétractation ne s'applique pas aux denrées alimentaires périssables ni aux biens susceptibles de se détériorer ou de se périmer rapidement. Les commandes de plats préparés ne sont donc pas annulables une fois la préparation engagée, sauf accord du Vendeur.",
    ),
    h("Article 8 — Réclamations et médiation"),
    p(
      "Toute réclamation peut être adressée à topsy.par@gmail.com. En cas de litige non résolu, le consommateur peut saisir gratuitement le médiateur de la consommation : {{NOM_MEDIATEUR}} — {{ADRESSE_OU_SITE_MEDIATEUR}}. Plateforme européenne de règlement des litiges : ec.europa.eu/consumers/odr.",
    ),
    h("Article 9 — Données personnelles"),
    p(
      "Les données collectées dans le cadre de la commande sont traitées conformément à la Politique de confidentialité du site.",
    ),
    h("Article 10 — Droit applicable"),
    p(
      "Les présentes CGV sont soumises au droit français. À défaut de résolution amiable, les tribunaux français sont compétents.",
    ),
  ],
};

export const confidentialite: LegalDoc = {
  slug: "confidentialite",
  title: "Politique de confidentialité",
  updated: "15 juin 2026",
  blocks: [
    p(
      "La présente politique décrit la manière dont TOPSY PARIS traite les données personnelles des utilisateurs du site topsy-paris.fr, conformément au Règlement Général sur la Protection des Données (RGPD, UE 2016/679) et à la loi Informatique et Libertés.",
    ),
    h("Responsable du traitement"),
    p(
      "TOPSY PARIS (SAS), 66 avenue Henri Barbusse, 95470 Fosses. Établissement : 12 mail de l'Égalité, 93120 La Courneuve. Contact pour toute question relative aux données : topsy.par@gmail.com.",
    ),
    h("Données collectées"),
    p(
      "Identité et coordonnées (nom, e-mail, téléphone), adresse de livraison, contenu et historique des commandes, et données de compte (mot de passe chiffré, identifiant Google le cas échéant). Les données de paiement carte sont traitées directement par SumUp et ne sont pas conservées par le Vendeur.",
    ),
    h("Finalités et bases légales"),
    p(
      "Traitement des commandes et de la relation client (exécution du contrat) ; gestion du compte (exécution du contrat) ; réponse aux demandes de contact / traiteur (intérêt légitime) ; obligations comptables et fiscales (obligation légale) ; mesure d'audience et amélioration du site (consentement).",
    ),
    h("Destinataires"),
    p(
      "Les données sont destinées aux services internes du Vendeur et à ses sous-traitants techniques : SumUp (paiement), Resend (e-mails transactionnels), Vercel et Heroku/Salesforce (hébergement). Ces prestataires n'utilisent les données que pour les besoins du service.",
    ),
    h("Durées de conservation"),
    p(
      "Données de commande : conservées le temps de la relation contractuelle puis archivées selon les obligations légales (notamment comptables, jusqu'à 10 ans). Compte client : jusqu'à sa suppression. Demandes de contact : 3 ans.",
    ),
    h("Transferts hors UE"),
    p(
      "Certains prestataires (Vercel, Heroku/Salesforce) peuvent être établis hors de l'Union européenne. Les transferts éventuels sont encadrés par les clauses contractuelles types de la Commission européenne. Région d'hébergement des données : Union européenne et États-Unis (Vercel, Heroku), transferts encadrés par les clauses contractuelles types de la Commission européenne.",
    ),
    h("Vos droits"),
    p(
      "Vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition, de limitation et de portabilité de vos données. Vous pouvez les exercer en écrivant à topsy.par@gmail.com. Vous pouvez également introduire une réclamation auprès de la CNIL (www.cnil.fr).",
    ),
  ],
};

export const cookies: LegalDoc = {
  slug: "cookies",
  title: "Politique cookies",
  updated: "15 juin 2026",
  blocks: [
    p(
      "Le site topsy-paris.fr utilise des cookies et traceurs. Cette page explique lesquels et comment les gérer, conformément aux recommandations de la CNIL.",
    ),
    h("Qu'est-ce qu'un cookie ?"),
    p(
      "Un cookie est un petit fichier déposé sur votre terminal lors de la visite d'un site. Il permet de mémoriser des informations (panier, session, préférences) ou de mesurer l'audience.",
    ),
    h("Cookies strictement nécessaires"),
    p(
      "Indispensables au fonctionnement du site : maintien de la session, panier, sécurité, langue. Ils ne requièrent pas votre consentement et ne peuvent pas être désactivés.",
    ),
    h("Cookies de mesure d'audience et autres"),
    p(
      "Soumis à votre consentement : statistiques de fréquentation et amélioration du service ({{OUTILS_MESURE_AUDIENCE}}). Ils ne sont déposés qu'après acceptation via le bandeau cookies.",
    ),
    h("Gérer vos cookies"),
    p(
      "Vous pouvez accepter ou refuser les cookies non essentiels à tout moment via le bandeau de consentement, ou configurer votre navigateur pour les bloquer. Le refus des cookies non essentiels n'empêche pas l'utilisation du site.",
    ),
    h("Durée de conservation"),
    p(
      "Les cookies de consentement et de mesure d'audience sont conservés au maximum 13 mois, conformément aux recommandations de la CNIL.",
    ),
  ],
};

export const legalDocs: Record<LegalDoc["slug"], LegalDoc> = {
  "mentions-legales": mentionsLegales,
  cgv,
  confidentialite,
  cookies,
};
