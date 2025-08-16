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
    <div className="fixed bottom-0 left-0 w-full bg-white flex justify-around py-3 z-50 border  border-t border-gray-200 shadow-t">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex flex-col items-center text-sm font-semibold ${
            active === item.id ? "text-green-800" : "text-gray-500"
          }`}
        >
          <span className="text-3xl">{item.icon}</span>
        </button>
      ))}
      
    </div>
  );
}
