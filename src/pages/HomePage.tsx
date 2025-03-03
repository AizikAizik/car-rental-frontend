import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Car Rental Service</h1>
      <p className="text-gray-600 mt-4">Find your perfect car today!</p>
      <Link to="/cars" className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg">
        Browse Cars
      </Link>
    </div>
  );
}
