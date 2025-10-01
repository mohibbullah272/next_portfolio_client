import { SignupForm } from "@/components/SignupForm";


const SignupPage = () => {
    return (
        <div className="flex min-h-screen w-full items-center justify-center  md:p-10">
        <div className="w-full max-w-sm">
     <SignupForm></SignupForm>
        </div>
      </div>
    );
};

export default SignupPage;