import React from "react";

const Login = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen w-full overflow-hidden px-4 flex items-center justify-center">
      {/* Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-[-80px] left-[-80px] w-60 h-60 sm:w-72 sm:h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 right-[-60px] w-60 h-60 sm:w-72 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-72 h-72 sm:w-80 sm:h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      </div>

      {/* Glass card */}
      <div className="relative z-10 w-full max-w-md bg-white shadow-md rounded-2xl border border-gray-200 p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800 tracking-wide">
          Sign In
        </h1>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="bg-gray-50 border border-gray-300 w-full px-3 py-2 rounded-md text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="bg-gray-50 border border-gray-300 w-full px-3 py-2 rounded-md text-gray-800 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-teal-400 text-white py-3 rounded-md font-semibold shadow-lg hover:opacity-90 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-green-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
