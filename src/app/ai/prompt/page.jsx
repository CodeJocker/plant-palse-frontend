import React from "react";
import { Bot, FileText, History } from "lucide-react";
import Link from "next/link";
import NavBar from "../../../components/heading";
import BottomNav from "../../../components/bottomBar";

const promptFeatures = [
    {
      title: "AI Plant Disease Chat",
      description:
        "Ask questions about plant diseases, symptoms, and treatments. Get instant AI-powered advice.",
      icon: <Bot className="w-8 h-8 text-green-400" />,
      href: "/ai/prompt/prompt-create",
      color: "from-green-700 to-green-500",
    },
    {
      title: "Prompt History",
      description:
        "View, filter, and manage your previous AI consultations and diagnoses.",
      icon: <History className="w-8 h-8 text-yellow-400" />,
      href: "/ai/prompt/prompt-history",
      color: "from-yellow-700 to-yellow-500",
    },
];

const page = () => {
  return (
      <div className="
       flex flex-col items-center py-28 px-4">
          <NavBar />
      <h1 className="text-3xl font-bold text-white mb-10 tracking-tight text-center">
        AI Prompt Features
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
        {promptFeatures.map((f) => (
          <Link
            href={f.href}
            key={f.title}
            className={`group bg-gray-100 rounded-2xl shadow-xl border border-green-400/20 hover:border-green-400/60 transition-all p-7 flex flex-col gap-4 hover:scale-[1.03] hover:shadow-2xl`}
            style={{ minHeight: 180 }}
          >
            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${f.color} shadow-lg mb-2`}
            >
              {f.icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-green-400 transition">
                {f.title}
              </h2>
              <p className="text-gray-300 text-base">{f.description}</p>
            </div>
          </Link>
        ))}
          </div>
          <BottomNav />
    </div>
  );
};

export default page;
