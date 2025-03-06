import {useParams, Link, useNavigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCarById } from "../api"; // You'll need to create this API function
import { Car } from "../types";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

export default function CarDetail() {
  const { carId } = useParams<{ carId: string }>();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const { data: car, isLoading, error } = useQuery<Car>({
    queryKey: ["car", carId],
    queryFn: () => getCarById(carId!),
    enabled: !!carId // Only run query if carId exists
  });

  const handleBookNow = () => {
    navigate(`/booking/${carId}`);
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-center text-red-500">Error loading car details</div>;
  if (!car) return <div className="text-center">Car not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={logout} />

      <div className="container mx-auto p-6">
        <Link to="/cars" className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Cars
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img
                src={car.imageUrl}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-64 object-cover rounded"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">
                {car.brand} {car.model}
              </h1>
              <div className="space-y-2">
                <p><span className="font-semibold">Year:</span> {car.year}</p>
                <p><span className="font-semibold">Price per day:</span> ${car.pricePerDay}</p>
                <p><span className="font-semibold">Gear:</span> {car.type}</p>
                {/* Add more car details as needed */}
                <p><span className="font-semibold">Status:</span> {car.available ? "Available" : "Not Available"}</p>
              </div>

              <button
                className={`mt-6 w-full py-3 px-4 rounded-lg text-white ${
                  car.available
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!car.available}
                onClick={handleBookNow}
              >
                {car.available ? "Book Now" : "Not Available"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}