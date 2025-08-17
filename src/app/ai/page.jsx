import React from "react";
import { Bot, History, FileText, Search } from "lucide-react";
import Link from "next/link";
import BottomNav from "../../components/bottomBar";
import NavBar from "../../components/heading";

const features = [

  {
    title: "Diagnosis Assistant",
    description:
      "Diagnose plant diseases by describing symptoms or uploading images. Let AI help you identify issues.",
    icon: <Search className="w-8 h-8 text-blue-400" />,
    href: "/ai/diagnose",
    color: "from-blue-700 to-blue-500",
  },
  {
    title: "Prompts Assistant",
    description:
      "Prompt plant diseases by describing symptoms or uploading images. Let AI help you identify issues.",
    icon: <Bot className="w-8 h-8 text-blue-400" />,
    href: "/ai/prompt",
    color: "from-blue-700 to-blue-500",
  },


];

const page = () => {
  return (
    <>
      <NavBar />
      <div className="theme flex flex-col items-center py-24 px-4">
        <h1 className="text-4xl font-bold text-white mb-10 tracking-tight text-center">
          AI Features
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
          {features.map((f, i) => (
            <Link
              href={f.href}
              key={f.title}
              className={`group bg-[#20262d] rounded-2xl shadow-xl border border-green-400/10 hover:border-green-400/60 transition-all p-7 flex flex-col gap-4 hover:scale-[1.03] hover:shadow-2xl`}
              style={{ minHeight: 220 }}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${f.color} shadow-lg mb-2`}
              >
                {f.icon}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-1 group-hover:text-green-400 transition">
                  {f.title}
                </h2>
                <p className="text-gray-300 text-base">{f.description}</p>
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
