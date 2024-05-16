import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const AdminAreaPage = async () => {
  const { isAuthenticated, getPermission } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const permission = await getPermission("update: data");

  if (!permission?.isGranted) redirect("/blog");

  return <div>AdminAreaPage</div>;
};

export default AdminAreaPage;
