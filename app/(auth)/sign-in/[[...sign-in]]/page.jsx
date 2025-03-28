"use client";
import { SignIn, useAuth, useUser } from "@clerk/nextjs";


const SigninPage = () => {
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn  
      />
    </div>
  );
};

export default SigninPage;
