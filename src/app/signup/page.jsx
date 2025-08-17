import React from 'react'
import SignUp from './SignUpForm'
import NavBar from '../../components/heading'
// import BottomNav from '../../components/bottomBar';

const page = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="navbar">
        <NavBar />
      </div>
      <div className="form">
        <SignUp />
      </div>
    </div>
  );
}

export default page