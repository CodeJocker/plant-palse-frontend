"use client"
import React, { useState } from "react";
import { FaHome, FaCamera, FaLeaf, FaPills } from "react-icons/fa";

export default function BottomNav() {
  const [active, setActive] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: <FaHome /> },
    { id: "camera", label: "Camera", icon: <FaCamera /> },
    { id: "medicine", label: "Medicine", icon: <FaPills /> },
    { id: "leaf", label: "Leaf", icon: <FaLeaf /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black flex justify-around py-3 z-50 border-t border-slate-200">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex flex-col items-center text-sm font-semibold ${
            active === item.id ? "text-green-600" : "text-white"
          }`}
        >
          <span className="text-3xl">{item.icon}</span>
        </button>
      ))}
      
    </div>
  );
}
