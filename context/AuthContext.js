import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { API_URL } from "@/config/index";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext"; // default = 'Context'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {username, email, password}
  const [error, setError] = useState(null);

  // Register user = {username, email, password}
  const register = async (user) => {
    console.log("Register", user);
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    console.log("Login", { identifier, password });
  };

  // Logout user
  const logout = async () => {
    console.log("Logout");
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    console.log("Check User Logged In");
  };

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, logout, checkUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContext;
