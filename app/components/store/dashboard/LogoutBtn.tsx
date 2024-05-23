"use client";
import { useUser } from "@/app/contexts/UserContext";
import Link from "next/link";

const LogoutBtn = () => {
  const { user, loading } = useUser();

  const userPermissions = user ? user.roles : [];
  return (
    <>
      <p>
        <span className='font-bold text-lg md:text-xl lg:text-2xl'>
          پروفایل
        </span>{" "}
        {user ? `${user?.email}` : "شما"}
      </p>
      <Link
        href={"/logout"}
        className='px-4 py-1 md:text-xl text-gray-50 bg-orange-600 hover:bg-orange-700 rounded-full'
      >
        خروج
      </Link>
    </>
  );
};

export default LogoutBtn;
