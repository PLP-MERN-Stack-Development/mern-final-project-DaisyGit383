import React from "react";

const Card = ({ title, description, link, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition transform cursor-pointer"
    >
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {description && <p className="text-gray-700 mb-2 whitespace-pre-line">{description}</p>}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
          Open Resource
        </a>
      )}
      {children}
    </div>
  );
};

export default Card;