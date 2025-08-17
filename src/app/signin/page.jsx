import React from "react";
import NavBar from "../../components/heading";
import SignInForm from "./SignInForm";
// import BottomNav from '../../components/bottomBar';

const page = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="form">
        <SignInForm />
      </div>
    </div>
  );
};

export default page;
