export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  available: boolean;
  imageUrl: string;
  type: "AUTOMATIC" | "MANUAL";
}

export interface Booking {
  carId: string;
  startDate: string;
  endDate: string;
}

export interface PaymentResponse {
  clientSecret: string;
}

export interface ProfileResponse {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  id: string;
  role: ["USER" | "ADMIN"]
}

export interface BookingResponse {
  id: string;
  user: ProfileResponse;
  car: Car;
  priceOfBooking: number;
  startDate: string;
  endDate: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  password?: string; // Optional for security
  token?: string;
  roles: ["USER" | "ADMIN"];
}

export interface AuthResponse {
  token: string;
  message?: string;
  user: User;
}