import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Modal from "../components/Modal";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => loginUser(email, password),
    onSuccess: (data) => {
      login(data.token);
      setModalMessage("Login successful!");
      setTimeout(() => navigate("/cars"), 2000); // Redirect after 2s
    },
    onError: () => setModalMessage("Invalid credentials, please try again."),
  });

  const closeModal = () => setModalMessage(null);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate();
          }}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-all duration-200"
          >
            {mutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>

      {/* Custom Modal */}
      <Modal isOpen={!!modalMessage} onClose={closeModal} title="Login Status">
        <p>{modalMessage}</p>
      </Modal>
    </div>
  );
}
