import React, { useState, useRef, useEffect } from "react";
import "./Header.css";
import { FaWallet } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import UserProfile from "../../components/UserProfile/UserProfile";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);

  const handleOpen = () => {
    setIsOpen((prev) => !prev); // toggles the state
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="navbar">
        <h1>
          MoneyMate
          <FaWallet color="gold" className="logo-image" />
        </h1>
        <AiFillSetting className="menu-btn" onClick={handleOpen} />
      </div>
      {isOpen && (
        <div className="profile" ref={profileRef}>
          <UserProfile />
        </div>
      )}
    </>
  );
};

export default Header;
