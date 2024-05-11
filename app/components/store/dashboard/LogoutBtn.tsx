"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const LogoutBtn = () => {
  return (
    <LogoutLink className='px-4 py-1 md:text-xl text-gray-50 bg-orange-600 hover:bg-orange-700 rounded-full'>
      خروج
    </LogoutLink>
  );
};

export default LogoutBtn;
