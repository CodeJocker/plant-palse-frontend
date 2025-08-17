'use client'
import { FaUser } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="bg-black fixed top-0 left-0 w-full border-b border-slate-400 z-50">
        <nav className="flex justify-between items-center px-6 md:px-16 py-3">
          {/* Logo */}
          <h1 className="font-extrabold text-xl text-green-800 tracking-wide cursor-pointer">
            🍀 palse
          </h1>

          {/* Profile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-3 border-2 border-green-700 
                       rounded-full text-green-700 hover:bg-green-700 hover:text-white 
                       transition duration-300 ease-in-out"
          >
            <FaUser className="text-lg" />
          </button>
        </nav>
      </header>

      {/* Dropdown Menu */}
      <div
        className={`fixed right-6 mt-20 bg-white p-4 text-green-600 text-right transition-all duration-300 ease-in-out transform ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <p className="py-2 px-3 hover:bg-gray-100 rounded cursor-pointer w-full">Profile</p>
        <p className="py-2 px-3 bg-red-600 hover:bg-red-800 text-white rounded cursor-pointer w-full">Logout</p>
      </div>
    </>
  );
};

export default NavBar;
