import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import CarsPage from "./pages/CarsPage.tsx";
import CarDetail from "./pages/CarDetail.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import PaymentPage from "./pages/PaymentPage.tsx";
import BookingsPage from "./pages/BookingDetails.tsx"; // New page, added below
import Navbar from "./components/Navbar.tsx";
import { useAuth } from "./context/AuthContext.tsx";
import { JSX } from "react";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}

export default function AppRouter() {
  const { user, logout } = useAuth();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={logout} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<CarsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/car/:carId" element={<CarDetail />} />
            <Route
              path="/booking/:carId"
              element={
                <PrivateRoute>
                  <BookingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment/:bookingId"
              element={
                <PrivateRoute>
                  <PaymentPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookings"
              element={
                <PrivateRoute>
                  <BookingsPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}