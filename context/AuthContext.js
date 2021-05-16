import { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { API_URL, NEXT_URL } from "@/config/index";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext"; // default = 'Context'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {username, email, password}
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []); // ON INITIAL RENDER

  // Register user = {username, email, password}
  const register = async (user) => {
    console.log("Register", user);
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    // console.log("Login", { identifier, password });
    // [API ROUTES]
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifier, password }),
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      setUser(data.user);
      setError(null);
      // REDIRECT
      router.push("/account/dashboard");
    } else {
      setError(data.message);
      setUser(null);
    }
  };

  // Logout user
  const logout = async () => {
    // console.log("Logout");
    // [API ROUTES]
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });
    const data = await res.json();
    // console.log(data);
    if (res.ok) {
      setUser(null);
      // REDIRECT
      router.push("/");
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    // console.log("Check User Logged In");
    // [API ROUTES]
    const res = await fetch(`${NEXT_URL}/api/user`); // GET
    const data = await res.json();
    // console.log(data);
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
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
