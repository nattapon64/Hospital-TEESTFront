import React, { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Add event listener for ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Clean up event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <header className="bg-teal-600 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4 md:p-6 lg:p-8">
        <div className="flex items-center space-x-4">
          <p className="font-bold text-lg md:text-xl lg:text-2xl">
            Welcome: {user?.CID ? user.username : 'Guest'}
          </p>
        </div>
        <div className="flex items-center">
          <img
            className="w-[50px] h-[50px] object-contain cursor-pointer"
            src="https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/308443439_461409806022081_9038034175762275250_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xt78mJT8wiMQ7kNvgEnosCM&_nc_ht=scontent.fbkk6-1.fna&oh=00_AYCRWh0LI29f5CHSBxoRjgJrV4zc69SQC-n5jcmR5EU_AA&oe=66A65609"
            alt="Logo"
            onClick={handleImageClick}
          />
        </div>
        <div className="flex items-center">
          {user?.CID && (
            <button
              onClick={hdlLogout}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-500 transition duration-300 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="ml-2">Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white max-w-screen-lg max-h-screen p-4 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="w-full h-auto max-h-[80vh] object-contain"
              src="https://scontent.fbkk6-1.fna.fbcdn.net/v/t39.30808-6/308443439_461409806022081_9038034175762275250_n.png?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=xt78mJT8wiMQ7kNvgEnosCM&_nc_ht=scontent.fbkk6-1.fna&oh=00_AYCRWh0LI29f5CHSBxoRjgJrV4zc69SQC-n5jcmR5EU_AA&oe=66A65609"
              alt="Logo Enlarged"
            />
            <button
              className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
