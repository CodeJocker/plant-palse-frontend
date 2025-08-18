'use client';

import React, { useState } from "react";
import { Mail, Lock, LogIn, ArrowRight, CircleUserRound } from "lucide-react";
import Link from "next/link";
// import Router from "next/router";

const SignInForm = () => {
  const submitdata = (e) => {
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.ok) {
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
      });
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-100 px-4">
      {/* Blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 -right-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-50px] left-1/2 transform -translate-x-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200">
        <div className="flex flex-col items-center mb-6">
          <CircleUserRound className="w-14 h-14 text-green-600 mb-2" />
          <h1 className="text-3xl font-extrabold text-center mb-1 text-gray-800 tracking-wide">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm">
            Login to your plantPulse account
          </p>
        </div>

        <form className="space-y-5" onSubmit={submitdata}>
          <div>
            <label htmlFor="email" className="block text-xs text-gray-600 mb-1 font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                id="email"
                required
                placeholder="you@email.com"
                className="bg-gray-50 border border-gray-300 w-full pl-9 pr-3 py-2 rounded-md text-gray-800 focus:ring-2 focus:ring-green-500 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs text-gray-600 mb-1 font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="password"
                id="password"
                required
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 w-full pl-9 pr-3 py-2 rounded-md text-gray-800 focus:ring-2 focus:ring-green-500 outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-md font-semibold shadow hover:bg-green-700 transition text-base"
          >
            <ArrowRight className="w-5 h-5" /> Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-green-600 hover:underline flex items-center gap-1 justify-center">
          
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
