import { notonaskh } from "@/app/components/fonts";
import "./admin.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={notonaskh.className}>{children}</main>;
}
