import React from "react";
import { Link } from "react-router-dom";

const NotFoundScreen: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6 py-12 md:px-12">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-gray-900">404</h1>
        <p className="mt-4 text-2xl font-medium text-gray-700">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-500">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundScreen;
