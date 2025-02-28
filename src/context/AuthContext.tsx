import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {ProfileResponse} from "../types.ts";
import {getUserProfile} from "../api.ts";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  user: ProfileResponse | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [user, setUser] = useState<ProfileResponse | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      // Fetch user profile when token is available
      getUserProfile(token)
        .then((userData) => setUser(userData))
        .catch(() => setUser(null));
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = (newToken: string) => setToken(newToken);
  const logout = () => {
    setToken(null);
    setUser(null);
  }

  return <AuthContext.Provider value={{ token, login, logout, user }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
