import BogolanBand from "./BogolanBand";

export default function PageHero({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="pagehero">
      <BogolanBand height={14} className="pagehero__band" />
      <div className="pagehero__inner">
        <span className="kicker kicker--light">{kicker}</span>
        <h1 className="pagehero__title">{title}</h1>
        {sub && <p className="pagehero__sub">{sub}</p>}
      </div>
    </div>
  );
}
