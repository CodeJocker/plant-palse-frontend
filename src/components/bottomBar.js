"use client"
import { Bot, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { FaHome, FaCamera, FaLeaf, FaPills, FaRobot } from "react-icons/fa";

export default function BottomNav() {
  const [active, setActive] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: <FaHome /> , href:"/" },
    { id: "Bot", label: "Bot", icon: <FaRobot /> , href:"/ai" },
    { id: "leaf", label: "Leaf", icon: <FaLeaf /> , href:"/medecine" },
    // { id: "medicine", label: "Medicine", icon: <ShoppingCart /> , href:"/" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white flex justify-around py-5 z-50 border-t border-slate-200">
      {navItems.map((item) => (
        <Link
          href={item.href}  
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex flex-col items-center text-sm font-semibold ${
            active === item.id ? "text-green-800" : "text-gray-700"
          }`}
        >
          <span className="text-3xl">{item.icon}</span>
        </Link>
      ))}
      
    </div>
  );
}
