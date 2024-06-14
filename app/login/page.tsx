import LoginForm from "../components/LoginForm";

const page = () => {
  return (
    <main className='flex items-center justify-center md:h-screen'>
      <div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
        <div className='flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36'>
          <div className=' text-white '>
            <h1 className='text-2xl text-center font-bold mb-8'>
              ورود به حساب کاربری
            </h1>
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
};

export default page;
