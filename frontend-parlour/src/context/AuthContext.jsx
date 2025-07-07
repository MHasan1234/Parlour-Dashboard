import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();

 const login = async (email, password) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role); 

    setToken(token);
    setRole(user.role);

    navigate("/dashboard"); 
  } catch (err) {
    alert("Login failed");
  }
};


  const logout = () => {
    localStorage.clear();
    setToken("");
    setRole("");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
