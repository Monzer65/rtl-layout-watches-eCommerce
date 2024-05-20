import { notonaskh } from "@/app/components/fonts";
import "./admin.css";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { redirect } from "next/navigation";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const { isAuthenticated, getPermission } = getKindeServerSession();

  // if (!(await isAuthenticated())) {
  //   redirect("/api/auth/login");
  // }

  // const permission = await getPermission("update: data");

  // if (!permission?.isGranted) redirect("/");

  return <main className={notonaskh.className}>{children}</main>;
}
