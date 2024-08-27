import React from "react";

interface BoxProps {
  type: "info" | "warning" | "danger";
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ type, children }) => {
  let bgColor, borderColor, textColor;

  switch (type) {
    case "info":
      bgColor = "bg-blue-100";
      borderColor = "border-blue-500";
      textColor = "text-blue-700";
      break;
    case "warning":
      bgColor = "bg-yellow-100";
      borderColor = "border-yellow-500";
      textColor = "text-yellow-700";
      break;
    case "danger":
      bgColor = "bg-red-100";
      borderColor = "border-red-500";
      textColor = "text-red-700";
      break;
  }

  return (
    <div
      className={`${bgColor} ${textColor} border-l-4 ${borderColor} p-4 mb-4`}
    >
      {children}
    </div>
  );
};

export default Box;
