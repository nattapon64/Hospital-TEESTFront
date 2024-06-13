import React from 'react';
import Baruser from './Baruser';
import useAuth from '../../hooks/useAuth';

function Mainuser() {
  const { user, logout } = useAuth();

  return (
    <div className='flex'>
      <div>
        <Baruser />
      </div>
      <div className='flex flex-col justify-center text-center items-center w-full space-y-4'>
        <div className='text-3xl font-bold'>ยินดีเข้าสู่ Website Salary Slip</div>
        <div className='text-2xl'>{user.username}</div>
      </div>
    </div>
  );
}

export default Mainuser;
