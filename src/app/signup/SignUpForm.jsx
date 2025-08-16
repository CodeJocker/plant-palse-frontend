import React from "react";
import {
  Mail,
  Lock,
  User,
  LogIn,
  ArrowRight,
  CircleUserRound,
} from "lucide-react";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Blobs */}
      {/* <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 -right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-100px] left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div> */}

      <div className="relative z-10 w-full max-w-md p-8 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-6">
          <CircleUserRound className="w-14 h-14 text-green-400 mb-2" />
          <h1 className="text-3xl font-extrabold text-center mb-1 text-white tracking-wide">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm">
            Join SmartGreen and start your journey
          </p>
        </div>

        <form className="space-y-5">
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="firstName"
                className="block text-xs text-gray-400 mb-1 font-medium"
              >
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  id="firstName"
                  placeholder="First"
                  className="bg-gray-900/60 border border-gray-700 w-full pl-9 pr-3 py-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none text-sm"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastName"
                className="block text-xs text-gray-400 mb-1 font-medium"
              >
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last"
                  className="bg-gray-900/60 border border-gray-700 w-full pl-9 pr-3 py-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none text-sm"
                />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-gray-400 mb-1 font-medium"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="email"
                id="email"
                required
                placeholder="you@email.com"
                className="bg-gray-900/60 border border-gray-700 w-full pl-9 pr-3 py-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs text-gray-400 mb-1 font-medium"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="password"
                id="password"
                required
                placeholder="••••••••"
                className="bg-gray-900/60 border border-gray-700 w-full pl-9 pr-3 py-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-md font-semibold shadow-lg hover:opacity-90 transition text-base"
          >
            <ArrowRight className="w-5 h-5" />
            Sign Up
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-400 text-xs font-semibold">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 rounded-md font-semibold shadow hover:bg-gray-100 transition text-base border border-gray-300"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M44.5 20H24V28.5H36.5C35.5 32 32 35 27.5 35C22.5 35 18.5 31 18.5 26C18.5 21 22.5 17 27.5 17C29.5 17 31.5 17.5 33 18.5L38 13.5C34.5 10.5 30.5 9 27.5 9C17.5 9 9.5 17 9.5 26C9.5 35 17.5 43 27.5 43C36.5 43 44.5 35 44.5 26C44.5 24.5 44.5 22.5 44.5 20Z"
                fill="#4285F4"
              />
              <path
                d="M24 43C31.5 43 37.5 37 37.5 29.5H24V20H44.5C44.5 22.5 44.5 24.5 44.5 26C44.5 35 36.5 43 27.5 43C17.5 43 9.5 35 9.5 26C9.5 17 17.5 9 27.5 9C30.5 9 34.5 10.5 38 13.5L33 18.5C31.5 17.5 29.5 17 27.5 17C22.5 17 18.5 21 18.5 26C18.5 31 22.5 35 27.5 35C32 35 35.5 32 36.5 28.5H24V43Z"
                fill="#34A853"
              />
              <path
                d="M44.5 20H24V28.5H36.5C35.5 32 32 35 27.5 35C22.5 35 18.5 31 18.5 26C18.5 21 22.5 17 27.5 17C29.5 17 31.5 17.5 33 18.5L38 13.5C34.5 10.5 30.5 9 27.5 9C17.5 9 9.5 17 9.5 26C9.5 35 17.5 43 27.5 43C36.5 43 44.5 35 44.5 26C44.5 24.5 44.5 22.5 44.5 20Z"
                fill="#FBBC05"
              />
              <path
                d="M44.5 20H24V28.5H36.5C35.5 32 32 35 27.5 35C22.5 35 18.5 31 18.5 26C18.5 21 22.5 17 27.5 17C29.5 17 31.5 17.5 33 18.5L38 13.5C34.5 10.5 30.5 9 27.5 9C17.5 9 9.5 17 9.5 26C9.5 35 17.5 43 27.5 43C36.5 43 44.5 35 44.5 26C44.5 24.5 44.5 22.5 44.5 20Z"
                fill="#EA4335"
              />
            </g>
          </svg>
          Sign up with Google
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-green-400 hover:underline cursor-pointer flex items-center gap-1 justify-center">
            <LogIn className="w-4 h-4" />
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
