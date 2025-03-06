import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import CarsPage from "./pages/CarsPage.tsx";
import CarDetail from "./pages/CarDetail.tsx";
import {useAuth} from "./context/AuthContext.tsx";
import {JSX} from "react";
import BookingPage from "./pages/BookingPage.tsx";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  const location = useLocation();

  return token ? children : <Navigate to="/login" state={{ from: location }} />;
}


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/car/:carId" element={<CarDetail />} />
        <Route
          path="/booking/:carId"
          element={
            <PrivateRoute>
              <BookingPage />
            </PrivateRoute>
          }
        />

        {/* ✅ Catch-all route for 404 errors */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
