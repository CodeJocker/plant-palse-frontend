'use client';

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

  const submitData = async (e) => {
    e.preventDefault();

    // Collect values
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || "Registration successful!");
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">
      <div className="relative z-10 w-full max-w-md p-8 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-6">
          <CircleUserRound className="w-14 h-14 text-green-400 mb-2" />
          <h1 className="text-3xl font-extrabold text-center mb-1 text-white tracking-wide">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm">
            Join plantPulse and start your journey
          </p>
        </div>

        <form className="space-y-5" onSubmit={submitData}>
          <div className="flex gap-4">
            <div className="w-1/2">
              <label htmlFor="firstName" className="block text-xs text-gray-400 mb-1 font-medium">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input type="text" id="firstName" placeholder="First" className="bg-gray-900/60 border border-gray-700 w-full pl-9 pr-3 py-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none text-sm" required />
              </div>
            </div>
            <div className="w-1/2">
              <label htmlFor="lastName" className="block text-xs text-gray-400 mb-1 font-medium">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input type="text" id="lastName" placeholder="Last" className="bg-gray-900/60 border border-gray-700 w-full pl-9 pr-3 py-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none text-sm" required />
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-xs text-gray-400 mb-1 font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input type="email" id="email" required placeholder="you@email.com" className="bg-gray-900/60 border border-gray-700 w-full pl-9 pr-3 py-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none text-sm" />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs text-gray-400 mb-1 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input type="password" id="password" required placeholder="••••••••" className="bg-gray-900/60 border border-gray-700 w-full pl-9 pr-3 py-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none text-sm" />
            </div>
          </div>

          <button type="submit" className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-md font-semibold shadow-lg hover:opacity-90 transition text-base">
            <ArrowRight className="w-5 h-5" /> Sign Up
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-700" />
          <span className="text-gray-400 text-xs font-semibold">OR</span>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <button type="button" className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 py-3 rounded-md font-semibold shadow hover:bg-gray-100 transition text-base border border-gray-300">
          {/* Google icon */}
          Sign up with Google
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-green-400 hover:underline cursor-pointer flex items-center gap-1 justify-center">
            <LogIn className="w-4 h-4" /> Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
