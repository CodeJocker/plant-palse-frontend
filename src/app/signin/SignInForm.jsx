'use client'
import React, { useState } from "react";
import { Mail, Lock, LogIn, ArrowRight, CircleUserRound } from "lucide-react";
import Link from "next/link";
// import Router from "next/router";

const SignInForm = () => {

  const submitdata = (e) => {
    e.preventDefault();

    // const {} = Router()

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Send data to backend login endpoint
    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'JSON'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
          // Save token and user info
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.localStorage.setItem('token', data.token);
          window.location.href = '/features';
          if (typeof window !== "undefined") {
  localStorage.setItem("token", userToken);
  document.cookie = `token=${userToken}; path=/; max-age=3600`; // expires in 1h
}
        } else {
          alert(data.error || 'Login failed');
        }
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Failed to connect to backend');
      });
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="relative z-10 w-full max-w-md p-8 backdrop-blur-xl">
        <div className="flex flex-col items-center mb-6">
          <CircleUserRound className="w-14 h-14 text-green-400 mb-2" />
          <h1 className="text-3xl font-extrabold text-center mb-1 text-white tracking-wide">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm">
            Login to your SmartGreen account
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-xs text-gray-400 mb-1 font-medium">
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
            <label htmlFor="password" className="block text-xs text-gray-400 mb-1 font-medium">
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
            onClick={submitdata}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-md font-semibold shadow-lg hover:opacity-90 transition text-base"
          >
            <LogIn className="w-5 h-5" />
            Login
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
          {/* Google Icon */}
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
          Login with Google
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don't have an account?{" "}
          <Link href="signup" className="text-green-400 hover:underline cursor-pointer flex items-center gap-1 justify-center">
            <ArrowRight className="w-4 h-4" />
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
