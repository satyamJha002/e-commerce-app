import React from "react";

const LoadingSpinner = ({
  size = "lg",
  text = "Loading...",
  type = "spinner",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <span
        className={`loading loading-${type} loading-${size} text-primary`}
      ></span>
      {text && (
        <p className="text-lg text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
