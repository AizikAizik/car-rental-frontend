import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserBookings, deleteBooking } from "../api";
import { useAuth } from "../context/AuthContext";
import { BookingResponse } from "../types";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Install react-icons: npm install react-icons

export default function BookingsPage() {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: bookings, isLoading, error } = useQuery<BookingResponse[]>({
    queryKey: ["bookings"],
    queryFn: () => getUserBookings(token!),
    enabled: !!token,
  });

  const deleteMutation = useMutation({
    mutationFn: (bookingId: string) => deleteBooking(bookingId, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      alert("Booking deleted successfully!");
    },
    onError: (err) => {
      console.error("Delete failed:", err);
      alert("Failed to delete booking.");
    },
  });

  const handleDelete = (bookingId: string) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      deleteMutation.mutate(bookingId);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div className="text-center text-red-500">Error loading bookings</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      {bookings?.length ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-md">
            <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Car</th>
              <th className="p-3 text-left">Start Date</th>
              <th className="p-3 text-left">End Date</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Payment Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="p-3">{`${booking.car.brand} ${booking.car.model}`}</td>
                <td className="p-3">{new Date(booking.startDate).toLocaleDateString()}</td>
                <td className="p-3">{new Date(booking.endDate).toLocaleDateString()}</td>
                <td className="p-3">${booking.priceOfBooking.toFixed(2)}</td>
                <td className="p-3">{booking.status}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    {booking.status === "PENDING" && (
                      <button
                        onClick={() =>
                          navigate(`/payment/${booking.id}`, {
                            state: { totalPrice: booking.priceOfBooking },
                          })
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Pay Now
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
}