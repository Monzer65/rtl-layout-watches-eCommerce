import {
  getKindeServerSession,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const BlogDashboardPage = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }

  const user = await getUser();

  return (
    <div className='px-8'>
      <h1 className='text-3xl font-bold'>داشبورد</h1>
      {user?.picture ? (
        <Image src={user.picture} alt='user image' width={150} height={150} />
      ) : (
        "No picture"
      )}
      <p>
        {user?.given_name} {user?.family_name}
      </p>
      <LogoutLink>خروج</LogoutLink>
    </div>
  );
};

export default BlogDashboardPage;
