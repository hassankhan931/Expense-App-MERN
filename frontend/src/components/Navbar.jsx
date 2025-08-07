import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="p-4 text-white bg-blue-700 shadow">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-xl font-bold">
          ExpenseTracker
        </Link>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/" className="hover:underline">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

