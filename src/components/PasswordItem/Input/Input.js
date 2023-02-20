import React from "react";
import "./Input.css";

const Input = ({ onChange, value, type }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    />
  );
};

export default Input;
