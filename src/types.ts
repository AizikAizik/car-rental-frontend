export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  available: boolean;
}

export interface Booking {
  id?: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  status?: "Pending" | "Confirmed" | "Cancelled";
}

export interface PaymentResponse {
  clientSecret: string;
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