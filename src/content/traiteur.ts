/**
 * Données traiteur — Topsy Paris. Source unique pour la page /traiteur et l'estimateur Kola.
 * Faits réels : événements sur devis, prévenir ≥ 10 jours. Zones de livraison alignées sur /livraison.
 */

export const TRAITEUR_CONTEXTS: { id: string; label: string; desc: string }[] = [
  { id: "familles", label: "Familles", desc: "Baptêmes, anniversaires, réunions de famille." },
  { id: "entreprises", label: "Entreprises", desc: "Séminaires, déjeuners d'équipe, afterworks." },
  { id: "evenementiel", label: "Événementiel", desc: "Mariages et grands événements sur mesure." },
];

export const TRAITEUR_FORMULAS: {
  name: string;
  serves: string;
  desc: string;
  includes: string[];
  from: number; // euros / personne
}[] = [
  {
    name: "Apéro-dînatoire",
    serves: "dès 6 pers.",
    desc: "Pièces salées, brochettes & mignardises à partager.",
    includes: ["Nems", "Samoussas", "Accras", "Brochettes", "Sauces maison"],
    from: 10,
  },
  {
    name: "Formule Zen",
    serves: "dès 6 pers.",
    desc: "Sélection 100 % végétarienne, généreuse et parfumée.",
    includes: ["Koki", "Accras de banane", "Plantains", "Légumes sautés", "Riz parfumé"],
    from: 14,
  },
  {
    name: "Formule Tradition",
    serves: "dès 6 pers.",
    desc: "Plats traditionnels camerounais et accompagnements.",
    includes: ["Ndolé ou Yassa", "Riz parfumé", "Plantains", "Entrée du jour"],
    from: 16,
  },
  {
    name: "Formule Grillades",
    serves: "dès 6 pers.",
    desc: "Brochettes, poulets & poissons braisés.",
    includes: ["Poulet braisé", "Poisson braisé", "Brochettes", "Plantains", "Riz"],
    from: 18,
  },
];

// Estimateur Kola — formules par personne (id → € / pers).
export const DEVIS_FORMULAS: {
  id: string;
  label: string;
  per: number;
  desc: string;
  includes: string[];
}[] = [
  { id: "apero", label: "Apéro-dînatoire", per: 10, desc: "Pièces salées, brochettes, mignardises", includes: ["Nems", "Samoussas", "Accras", "Brochettes"] },
  { id: "zen", label: "Formule Zen (végé)", per: 14, desc: "Sélection 100 % végétarienne", includes: ["Koki", "Plantains", "Légumes sautés", "Riz parfumé"] },
  { id: "tradition", label: "Formule Tradition", per: 16, desc: "Plats traditionnels & accompagnements", includes: ["Ndolé ou Yassa", "Riz parfumé", "Plantains"] },
  { id: "grillades", label: "Formule Grillades", per: 18, desc: "Brochettes, poulets & poissons braisés", includes: ["Poulet braisé", "Poisson braisé", "Brochettes", "Riz"] },
];

export const DEVIS_OCCASIONS: [string, string][] = [
  ["famille", "Famille"],
  ["entreprise", "Entreprise"],
  ["mariage", "Mariage / grand événement"],
];

// Zones de livraison réelles (rayon, frais €, minimum de commande €).
export const DEVIS_ZONES: { id: string; label: string; fee: number; min: number }[] = [
  { id: "verte", label: "Zone verte (≤ 20 km)", fee: 20, min: 45 },
  { id: "orange", label: "Zone orange (≤ 40 km)", fee: 30, min: 60 },
  { id: "bleue", label: "Zone bleue (≤ 60 km)", fee: 45, min: 90 },
];
