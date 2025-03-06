import {ProfileResponse} from "../types.ts";
import {Link} from "react-router-dom";

interface NavbarProps {
  user: ProfileResponse | null;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">Car Rental</h1>

      {/* Welcome message */}
      <span className="text-lg">Welcome, {user?.name || "Guest"}</span>

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
    </nav>
  );
}
