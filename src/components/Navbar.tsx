import {ProfileResponse} from "../types.ts";

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

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
      >
        Logout
      </button>
    </nav>
  );
}
