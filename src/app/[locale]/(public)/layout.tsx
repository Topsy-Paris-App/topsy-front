import Chrome from "@/components/topsy/Chrome";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Chrome>{children}</Chrome>;
}
