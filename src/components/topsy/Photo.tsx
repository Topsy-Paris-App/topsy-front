import Image from "next/image";

interface Props {
  imageUrl?: string | null;
  alt: string;
  radius?: number;
}

export default function Photo({ imageUrl, alt, radius = 0 }: Props) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes="(max-width: 680px) 50vw, 280px"
        style={{ objectFit: "cover", borderRadius: radius }}
      />
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--sable)",
        color: "var(--muted)",
        fontSize: 13,
        textAlign: "center",
        padding: 12,
        borderRadius: radius,
      }}
    >
      {alt}
    </div>
  );
}
