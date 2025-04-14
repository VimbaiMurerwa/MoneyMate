import React from "react";
import "./Input.css";

const Input = ({ state, setState, placeholder, type, id }) => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        value={state}
        id={id}
        onChange={(e) => setState(e.target.value)}
        className="custom-input"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;