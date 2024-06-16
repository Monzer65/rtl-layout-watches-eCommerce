import HeaderNav from "./HeaderNav";
import { getSession } from "@/app/lib/auth";

const BlogHeader = async () => {
  const session = await getSession();

  console.log("session:", session);
  return (
    <header className='sticky top-0'>
      <div className='bg-black text-white text-center py-1'>تبلیغ</div>
      <HeaderNav session={session} />
    </header>
  );
};

export default BlogHeader;
