import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCars } from "../api";
import { Car } from "../types";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";

export default function CarsPage() {
  const { user, logout } = useAuth(); // Get user details & logout function
  const { data: cars, isLoading } = useQuery<Car[]>({queryKey: ["cars"], queryFn: getCars});
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <Spinner />;

  // Filter cars based on search input
  const filteredCars = cars?.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Component */}
      <Navbar user={user} onLogout={logout} />

      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Cars</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by brand, model, or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars?.length ? (
            filteredCars.map((car) => (
              <div key={car.id} className="p-4 border rounded-lg shadow-lg bg-white">
                <img
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-40 object-cover rounded"
                />
                <h2 className="text-xl font-bold mt-2">
                  {car.brand} {car.model}
                </h2>
                <p>Year: {car.year}</p>
                <p>Price per day: ${car.pricePerDay}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No cars found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
