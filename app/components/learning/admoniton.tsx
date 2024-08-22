import React from "react";

interface AdmonitionProps {
  type: string;
  children: React.ReactNode;
}

const Admonition: React.FC<AdmonitionProps> = ({ type, children }) => {
  let className = "";

  switch (type) {
    case "info":
      className = "bg-blue-100 border-l-4 border-blue-500 text-blue-700";
      break;
    case "warning":
      className = "bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700";
      break;
    case "danger":
      className = "bg-red-100 border-l-4 border-red-500 text-red-700";
      break;
    // Add more types as needed
    default:
      className = "bg-gray-100 border-l-4 border-gray-500 text-gray-700";
  }

  return <div className={`p-4 mb-4 ${className}`}>{children}</div>;
};

export default Admonition;
