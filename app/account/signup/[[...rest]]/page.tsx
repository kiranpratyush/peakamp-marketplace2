"use client";

import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const SignUpPage = () => (
  <div className="flex min-h-screen bg-background">
    {/* Left side: Brand showcase */}
    <div className="hidden md:flex md:w-1/2 bg-primary/10 flex-col items-center justify-center p-8">
      <div className="max-w-md">
        <h1 className="font-heading text-4xl font-bold mb-4">Peak AMP</h1>
        <h2 className="text-2xl font-medium mb-6">
          Join our recycling community
        </h2>
        <p className="text-contrast-500 mb-8">
          Create an account to track your recycling efforts, earn rewards, and
          make a positive environmental impact with every recycling submission.
        </p>{" "}
        <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-xl bg-primary/20 flex items-center justify-center">
          <div className="p-6 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto h-20 w-20 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <p className="mt-4 font-medium">
              Join us in creating a sustainable future
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Right side: Sign up form */}
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-primary hover:underline mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="text-center mb-8">
          <h1 className="font-heading text-2xl md:text-3xl font-bold">
            Create your account
          </h1>
          <p className="text-contrast-500 mt-2">
            Start your recycling journey today
          </p>
        </div>

        <SignUp
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-primary hover:bg-primary-shadow text-white",
              card: "shadow-none border-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton:
                "border-contrast-200 hover:bg-contrast-100",
              formFieldInput:
                "border-contrast-200 focus:border-primary focus:ring-2 focus:ring-primary/20",
              footerActionLink: "text-primary hover:text-primary-shadow",
              formFieldLabelRow: "text-contrast-500",
            },
          }}
          redirectUrl="/account/profile"
          signInUrl="/account/sign-in"
        />

        <div className="text-center text-sm text-contrast-500 mt-8">
          <p>
            Already have an account?{" "}
            <Link
              href="/account/sign-in"
              className="text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SignUpPage;
