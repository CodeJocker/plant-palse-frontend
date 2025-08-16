"use client"

import { ArrowDown } from "lucide-react";
import { useState } from "react";

const FeaturesButton = () => {
    const [isHovered , setIsHovered] = useState(false)
  return (
    <div
      className="p-3 bg-green-600 hover:bg-green-800  duration-300 shadow-inner cursor-pointer flex gap-x-5 justify-between"
          onMouseEnter={() => setIsHovered(!isHovered)}
          onMouseLeave={() => setIsHovered(!isHovered)}
    >
      <h1 className="text-white">See Features </h1>
      <ArrowDown className={`${isHovered ? 'animate-bounce' : ""}`} />
    </div>
  );
}

export default FeaturesButton