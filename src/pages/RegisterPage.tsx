import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../components/Modal";

export default function RegisterPage() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhone] = useState<string>("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => registerUser({ name, email, password, address, phoneNumber }),
    onSuccess: (data) => {
      login(data.token);
      setModalMessage("Registration successful!");
      setTimeout(() => navigate("/cars"), 2000); // Redirect after 2s
    },
    onError: () => setModalMessage("Registration failed, please try again."),
  });

  const closeModal = () => setModalMessage(null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className="bg-white p-6 shadow-md rounded w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300 ease-in-out cursor-pointer"
        >
          {mutation.isPending ? "Registering..." : "Register"}
        </button>

        {/* Link to login page */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log in here
          </Link>
        </p>
      </form>

      {/* Custom Modal */}
      <Modal isOpen={!!modalMessage} onClose={closeModal} title="Registration Status">
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}
