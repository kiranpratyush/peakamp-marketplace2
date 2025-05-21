"use client";
import { SignIn } from "@clerk/nextjs";

const title = "Access the platform";
const description = "One stop shop for all your recycling needs.";

const SignInPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
    <div className="w-full max-w-md space-y-8">
      <div className="flex flex-col space-y-2 text-center"></div>
      <SignIn />
    </div>
  </div>
);

export default SignInPage;
