import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCarById, createBooking } from "../api";
import { Car, BookingResponse } from "../types";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingPage() {
  const { carId } = useParams<{ carId: string }>();
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const { data: car, isLoading, error } = useQuery<Car>({
    queryKey: ["car", carId],
    queryFn: () => getCarById(carId!),
    enabled: !!carId,
  });

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-center text-red-500">Error loading car details</div>;
  if (!car) return <div className="text-center">Car not found</div>;

  const calculateTotalPrice = () => {
    if (!startDate || !endDate) return 0;
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    return days * car.pricePerDay;
  };

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
    try {
      const bookingData = {
        carId: carId!,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
      const response: BookingResponse = await createBooking(bookingData, token);
      navigate(`/payment/${response.id}`, { state: { totalPrice: calculateTotalPrice() } });
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={logout} />
      <div className="container mx-auto p-6">
        <Link to={`/car/${carId}`} className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Car Details
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Book {car.brand} {car.model}</h1>
          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date as Date | null)}
                minDate={new Date()}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="w-full p-2 border rounded"
                placeholderText="Select start date"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date as Date | null)}
                minDate={startDate || new Date()}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                className="w-full p-2 border rounded"
                placeholderText="Select end date"
              />
            </div>
            <div>
              <p><span className="font-semibold">Price per day:</span> ${car.pricePerDay}</p>
              <p><span className="font-semibold">Total Price:</span> ${calculateTotalPrice().toFixed(2)}</p>
            </div>
            <button
              onClick={handleBooking}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={!startDate || !endDate}
              aria-autocomplete={"none"}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}