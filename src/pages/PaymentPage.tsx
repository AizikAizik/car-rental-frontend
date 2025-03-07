import { useState } from "react";
import {useParams, useLocation, Link, useNavigate} from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../api";
import { useAuth } from "../context/AuthContext";
import * as React from "react";

const stripePromise = loadStripe("pk_test_51QzwazQaFzUe2WtWXaWZBPdm6MLZ7lXBktEiXpklyQ609g1koG5TrY6vLHZuy64n6a4eTXP6mFybrHIP9irOqJHm006M4VY7gU");

const CheckoutForm = ({ bookingId, totalPrice, token }: { bookingId: string; totalPrice: number; token: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const { mutate: processPayment } = useMutation({
    mutationFn: () => createPayment(totalPrice, token, bookingId), // Pass token here
    onSuccess: async (paymentResponse) => {
      const { clientSecret } = paymentResponse;
      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
        },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed");
        setProcessing(false);
      } else {
        // Confirm booking
        await fetch(`http://localhost:8080/api/bookings/${bookingId}/confirm`, {
          method: "PUT",
          headers: { "Authorization": `Bearer ${token}` },
        });
        setProcessing(false);
        alert("Payment successful! Booking confirmed.");
        navigate("/bookings");
      }
    },
    onError: () => {
      setError("Failed to process payment");
      setProcessing(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);
    processPayment();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-2 border rounded" />
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
      >
        {processing ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
      </button>
    </form>
  );
};

export default function PaymentPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { token } = useAuth(); // Get token from AuthContext
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  if (!token) return <div className="text-center text-red-500">Authentication required</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <Link to={`/booking/${bookingId}`} className="text-blue-600 hover:underline mb-4 inline-block">
          ← Back to Booking
        </Link>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-4">Payment</h1>
          <p className="mb-4">Total Amount: ${totalPrice.toFixed(2)}</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm bookingId={bookingId!} totalPrice={totalPrice} token={token} />
          </Elements>
        </div>
      </div>
    </div>
  );
}