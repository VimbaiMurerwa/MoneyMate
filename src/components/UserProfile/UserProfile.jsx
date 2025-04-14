import React, { useEffect, useState } from "react";
import "./UserProfile.css";
import { FaUser } from "react-icons/fa";;
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import ColorSwitcher from "../../components/ColorSwitcher/ColorSwitcher";

const UserProfile = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const logout = () => {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logout Successfully");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.message); 
        });
    } catch (err) {
      toast.error(err.message); 
    }
  };

  const [colorSet, setColorSet] = useState({
    "--primary-purple": "#ea40de", 
    "--primary-purple-shade": "#f067d5", 
  });

  const handleColorChange = (colors) => {
    Object.entries(colors).forEach(([variable, color]) => {
      document.documentElement.style.setProperty(variable, color);
    });
    setColorSet(colors); 
  };

  return (
    <div className="profile-feature">
      {user && (
        <div className="user-profile">
          {user.photoURL ? (
            <img src={user.photoURL} alt="user-profile" className="img" />
          ) : (
            <FaUser className="no-photo" />
          )}
        </div>
      )}
      <div className="buttons">
        {user && (
          <>
            <h4>{user.displayName ? user.displayName : user.email}</h4>
            <p onClick={logout} className="logout-btn">
              Logout
            </p>
          </>
        )}
      </div>
      <ColorSwitcher handleColorChange={handleColorChange} />
    </div>
  );
};

export default UserProfile;
