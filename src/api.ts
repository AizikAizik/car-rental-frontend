import axios from "axios";
import {Car, Booking, PaymentResponse, AuthResponse, ProfileResponse, BookingResponse} from "./types";

const API_URL = "http://localhost:8080/api";

export const getCars = async (): Promise<Car[]> => {
  const response = await axios.get<Car[]>(`${API_URL}/cars`);
  return response.data;
};

export const getCarById = async (carId: string): Promise<Car> => {
  const response = await axios.get<Car>(`${API_URL}/cars/${carId}`);
  if (!response.data) {
    throw new Error("Failed to fetch car details");
  }
  return response.data;
};

export const createBooking = async (bookingData: Booking, token: string | null): Promise<BookingResponse> => {
  const response = await axios.post<BookingResponse>(
    `${API_URL}/bookings`,
    bookingData,
    {headers: {Authorization: `Bearer ${token}`}}
  );
  return response.data;
};

export const createPayment = async (amount: number, token: string, bookingId: string): Promise<PaymentResponse> => {
  const response = await axios.post<PaymentResponse>(
    `${API_URL}/payments/create?amount=${amount}&bookingId=${bookingId}`,
    {},
    {headers: {Authorization: `Bearer ${token}`}}
  );
  return response.data;
};

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string
}): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export async function getUserProfile(token: string) : Promise<ProfileResponse> {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error("Failed to fetch user profile");
  return response.json(); // This should return { id, name, email }
}


