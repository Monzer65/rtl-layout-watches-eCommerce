import HeaderClient from "./HeaderClient";
import { getSession } from "@/app/lib/auth";
import logo from "@/public/images/logo-1.svg";
const Header = async () => {
  const session = await getSession();

  return (
    <header>
      <HeaderClient session={session} logo={logo} />
    </header>
  );
};

export default Header;
