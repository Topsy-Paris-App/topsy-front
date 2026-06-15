const BADGE_LABELS: Record<string, string> = {
  signature: "Signature",
  halal: "Halal",
  piment: "Piment",
  vege: "Végé",
  surgele: "Surgelé",
};

export default function Badge({ kind }: { kind: string }) {
  return <span className={`badge badge--${kind}`}>{BADGE_LABELS[kind] ?? kind}</span>;
}
