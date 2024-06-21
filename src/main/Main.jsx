import React from "react";
import Header from "../Header";
import Bar from "../Sidebar";
import useAuth from "../hooks/useAuth";

function Main() {
  const { user, logout } = useAuth();
  return (
    <div className="w-full">
      <div className="flex">
        <Bar />
        <div className='flex flex-col justify-center text-center items-center w-full space-y-4'>
          <div className='text-3xl font-bold'>ยินดีเข้าสู่ Website Salary Slip</div>
          <div className='text-2xl'>{user.username}</div>
        </div>
      </div>
    </div>
  );
}

export default Main;
