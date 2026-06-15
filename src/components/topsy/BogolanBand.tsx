const COLORS = ["#C41E2F", "#157A43", "#F4B500", "#1E1B17"];

export default function BogolanBand({
  height = 14,
  className,
}: {
  height?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="100%"
      height={height}
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: 30 }).map((_, i) => (
        <rect key={i} x={i * 4} y="0" width="4" height="12" fill={COLORS[i % COLORS.length]} />
      ))}
    </svg>
  );
}
