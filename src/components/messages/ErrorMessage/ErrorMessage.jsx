import React from "react";

const ErrorMessage = ({ message }) => {
  return <div className="bg-black w-full h-full absolute top-0 left-0 right-0 bottom-0 font-vazirmatn flex items-center px-4 text-xs">{message}</div>;
};

export default ErrorMessage;
