import Image from "next/image";

interface Props {
  imageUrl?: string | null;
  alt: string;
  radius?: number;
}

// Self-contained: own `position:relative` full-size wrapper so a `fill` image is
// always clipped to the parent's box (which sizes it via aspect-ratio/height).
// Without this, the fill image escapes containers lacking position:relative
// (empty placeholder box + a giant mispositioned image).
export default function Photo({ imageUrl, alt, radius = 0 }: Props) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: radius,
        background: "var(--sable)",
      }}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 680px) 90vw, 600px"
          style={{ objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--muted)",
            fontSize: 13,
            textAlign: "center",
            padding: 12,
          }}
        >
          {alt}
        </div>
      )}
    </div>
  );
}
