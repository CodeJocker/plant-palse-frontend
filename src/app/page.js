import React from "react";
import ProfessionalAICamera from "./ai/diagnose/CreatePhoto";
import Index from "../layouts/Index";
import NavBar from "../components/heading";
import BottomNav from "../components/bottomBar";

const Home = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="index py-10">
        <Index />
      </div>
      <div className="bottom-bar">
        <BottomNav />
      </div>
    </div>
  );
};

export default Home;
