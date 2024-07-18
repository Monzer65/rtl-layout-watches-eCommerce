import Image from "next/image";

const Logo = () => {
  return (
    <div>
      <Image src='/images/logo-1.svg' alt='logo' height={100} width={100} />
    </div>
  );
};

export default Logo;
