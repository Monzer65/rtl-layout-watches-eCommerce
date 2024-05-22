import LoginForm from "../components/LoginForm";

const page = () => {
  return (
    <div className='border min-h-screen content-center'>
      <h1 className='text-2xl text-center font-bold mb-8'>
        ورود به حساب کاربری
      </h1>
      <LoginForm />
    </div>
  );
};

export default page;
