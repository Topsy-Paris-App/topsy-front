export default function Stars({ value = 5, size = 16 }: { value?: number; size?: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.25 && value - full < 0.85;
  const fills = Array.from({ length: 5 }, (_, i) =>
    i < full ? "100%" : i === full && half ? "50%" : "0%",
  );
  return (
    <span className="stars" aria-label={`${value} sur 5`}>
      {fills.map((f, i) => (
        <svg key={i} viewBox="0 0 24 24" width={size} height={size}>
          <defs>
            <linearGradient id={`star-${i}-${size}`}>
              <stop offset={f} stopColor="var(--safran)" />
              <stop offset={f} stopColor="rgba(0,0,0,0.14)" />
            </linearGradient>
          </defs>
          <path
            d="M12 2.5l2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.9l-5.8 3.05 1.1-6.45-4.7-4.6 6.5-.95z"
            fill={`url(#star-${i}-${size})`}
          />
        </svg>
      ))}
    </span>
  );
}
