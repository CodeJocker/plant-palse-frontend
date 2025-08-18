import React from "react";
import { Bot, Search } from "lucide-react";
import Link from "next/link";
import BottomNav from "../../components/bottomBar";
import NavBar from "../../components/heading";
import { FaUserDoctor } from "react-icons/fa6";
// import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";


const features = [
  {
    title: "Diagnosis Assistant",
    description:
      "Diagnose plant diseases by describing symptoms or uploading images. Let AI help you identify issues.",
    icon: <Search className="w-8 h-8 text-green-400" />,
    href: "/ai/diagnose",
    color: "from-green-700 to-green-500",
  },
  {
    title: "Prompts Assistant",
    description:
      "Prompt plant diseases by describing symptoms or uploading images. Let AI help you identify issues.",
    icon: <Bot className="w-8 h-8 text-green-400" />,
    href: "/ai/prompt",
    color: "from-green-700 to-green-500",
  },
  {
    title: "Diagnose using symptomes",
    description:
      "Provide plant symptomes orand upload image uploading images. Let AI help you identify issues.",
    icon: <FaUserDoctor className="w-8 h-8 text-green-400" />,
    href: "/ai/check",
    color: "from-green-700 to-green-500",
  },
];

const page = () => {
  //  const router = useRouter();
  return (
    <>
       {/* Top Nav */}
<div className="fixed top-0 left-0 flex items-center  shadow-lg px-4 py-4 bg-white w-full h-14 z-50">
  <Link href="/ai" className="flex items-center gap-2">
    <HiArrowLeft className="text-black text-xl" />
  </Link>
  <h2 className="absolute left-1/6 transform -translate-x-1/2 text-black font-semibold text-base sm:text-lg truncate">
    Prompt
  </h2>
</div>
      <div className="theme flex flex-col items-center py-15 px-4 sm:px-12 lg:px-24 ">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-10 tracking-tight text-center">
          AI Features
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl">
          {features.map((f) => (
            <Link
              href={f.href}
              key={f.title}
              className={`group bg-slate-100 rounded-2xl shadow-xl border border-green-400/10 hover:border-green-400/60 transition-all p-5 sm:p-7 flex flex-col gap-4 hover:scale-[1.03] hover:shadow-2xl`}
              style={{ minHeight: 220 }}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${f.color} shadow-lg mb-2`}
              >
                {f.icon}
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-green-800 mb-1 group-hover:text-green-400 transition">
                  {f.title}
                </h2>
                <p className="text-black text-sm sm:text-base">{f.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default page;
