import React from "react";

const Button = ({ children, onClick, color = "blue" }) => {
  const colors = {
    blue: "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800",
    green: "bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800",
    purple: "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800",
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition transform`}
    >
      {children}
    </button>
  );
};

export default Button;