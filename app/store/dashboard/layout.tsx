// import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import LogoutBtn from "@/app/components/store/dashboard/LogoutBtn";
import NavLinks from "@/app/components/store/dashboard/NavLinks";
import { UserIcon } from "@heroicons/react/24/outline";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function dashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login");
  }
  const user = await getUser();

  return (
    <div className='my-8 md:my-48 max-w-[800px] m-auto px-4'>
      <div className='flex justify-between items-center pb-2 border-b'>
        <p>
          <span className='font-bold text-lg md:text-xl lg:text-2xl'>
            پروفایل
          </span>{" "}
          {user ? `${user?.given_name} ${user?.family_name}` : "شما"}
        </p>
        <LogoutBtn />
      </div>
      <div className='flex flex-col md:flex-row py-4'>
        <div className=' p-2'>
          <div className='flex flex-col gap-1'>
            {user?.picture ? (
              <Image
                src={user?.picture}
                alt='user image'
                width={100}
                height={100}
                className='rounded-full'
              />
            ) : (
              <div className='w-[100px] h-[100px] bg-gray-100 rounded-full'>
                <UserIcon className='bg-gray-400' />
              </div>
            )}
            <h2>
              {user?.given_name} {user?.family_name}
            </h2>
            <p className='text-sm font-light text-gray-600'>{user?.email}</p>
          </div>
          <div className='grid grid-cols-4 md:grid-cols-1 gap-2 md:text-lg lg:text-xl text-gray-600 mt-8'>
            <NavLinks />
          </div>
        </div>
        <div className='flex-grow p-4'>{children}</div>
      </div>
    </div>
  );
}
