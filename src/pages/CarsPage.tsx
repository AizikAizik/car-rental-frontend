import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCars } from "../api";
import { Car } from "../types";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom"; // Add this import

export default function CarsPage() {
  const { data: cars, isLoading } = useQuery<Car[]>({queryKey: ["cars"], queryFn: getCars});
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) return <Spinner />;

  const filteredCars = cars?.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.year.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Cars</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by brand, model, or year..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredCars?.length ? (
            filteredCars.map((car) => (
              <Link
                to={`/car/${car.id}`}
                key={car.id}
                className="p-4 border rounded-lg shadow-lg bg-white transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105"
              >
                <img
                  src={car.imageUrl}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-40 object-cover rounded transition-transform duration-300 ease-in-out"
                />
                <h2 className="text-xl font-bold mt-2">
                  {car.brand} {car.model}
                </h2>
                <p>Year: {car.year}</p>
                <p>Price per day: ${car.pricePerDay}</p>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">No cars found.</p>
          )}
        </div>
      </div>
    </div>
  );
}