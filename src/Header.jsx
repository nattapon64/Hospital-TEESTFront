import React from "react";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router";

function Header() {

  const { user, logout } = useAuth()
  const navigate = useNavigate();
  // console.log(user)

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-between items-center px-8 bg-teal-400 h-[100px]">
        <div>
          <p className="bold">Welcome : {user?.CID ? user.username : 'Guest'}</p>
        </div>
        <div>
          <img
            className="flex w-[250px] "
            src="https://www.ktc.co.th/pub/media/Article/05/coffee-shop-1448x543.webp"
            alt="Description of the image"
          />
        </div>
        <div>
          {user?.CID && (
            <button
              onClick={hdlLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
            >
              ออกจากระบบ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
