import { NavLink, useNavigate } from "react-router-dom";
import { storageKey } from "../data";
import Button from "./ui/Button";
import { useAuth } from "../hooks/custom/useAuth";
import type { IUserData } from "../interfaces";
import { StickyNote } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, setUserData, notesCount } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem(storageKey);
    setToken("");
    setUserData({} as IUserData);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <nav className="max-w-5xl mx-auto mt-5 mb-16 px-6 py-4 bg-white shadow-md rounded-xl flex items-center justify-between">
      {/* logo */}
      <div className="flex items-center space-x-3">
        <StickyNote className="text-indigo-600 w-7 h-7" />
        <h1 className="text-2xl font-bold text-indigo-700 tracking-wide">
          Note-App
        </h1>
      </div>

      {/* links */}
      <ul className="flex items-center space-x-6 text-lg font-medium">
        <li></li>
      </ul>

      {/* right side */}
      <div className="flex items-center space-x-5">
        {/* notes counter */}
        <div className="relative">
          <StickyNote className="w-7 h-7 text-indigo-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
            {notesCount}
          </span>
        </div>

        {/* auth buttons */}
        {token ? (
          <Button
            onClick={handleLogout}
            className="bg-indigo-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-indigo-700 duration-200"
          >
            Logout
          </Button>
        ) : (
          <div className="flex items-center space-x-3">
            <NavLink
              to="/register"
              className="bg-indigo-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-indigo-700 duration-200"
            >
              Register
            </NavLink>
            <NavLink
              to="/login"
              className="bg-indigo-600 text-white font-semibold px-3 py-2 rounded-lg hover:bg-indigo-700 duration-200"
            >
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
