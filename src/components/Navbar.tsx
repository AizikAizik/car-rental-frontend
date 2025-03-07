import { ProfileResponse } from "../types.ts";
import { Link } from "react-router-dom";

interface NavbarProps {
  user: ProfileResponse | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold hover:text-gray-200 transition">
        Car Rental
      </Link>

      <div className="flex items-center space-x-4">
        {/* Welcome message */}
        <span className="text-lg">Welcome, {user?.name || "Guest"}</span>

        {/* Navigation Links */}
        {user && (
          <Link
            to="/bookings"
            className="hover:text-gray-200 transition"
          >
            Bookings
          </Link>
        )}

        {user ? (
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}