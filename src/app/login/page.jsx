import React from "react";

const Login = () => {
  return (
   <div className="relative bg-gray-900 h-full w-full">
     <div className="relative bg-gray-900 h-full py-40 flex items-center justify-center overflow-hidden px-4">
      {/* Blobs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute top-1/2 -right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-50px] left-1/3 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-md bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-white tracking-wide">
          Sign In
        </h1>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="bg-gray-900/60 border border-gray-700 w-full px-3 py-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="bg-gray-900/60 border border-gray-700 w-full px-3 py-2 rounded-md text-white focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-teal-400 text-white py-3 rounded-md font-semibold shadow-lg hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-green-400 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
   </div>
  );
};

export default Login;
