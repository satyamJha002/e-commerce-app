import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="mt-24 px-6 md:px-12 lg:px-20 h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        404 Not Found
      </h1>
      <p className="text-lg md:text-xl text-center mb-10">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className=" hover:text-blue-600 bg-blue-500 text-white px-4 py-2 rounded-md mt-10"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
