import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [cToken, setCToken] = useState(localStorage.getItem("cToken") || "");
  const [writeAccess, setWriteAccess] = useState(false);

  useEffect(() => {
    if (cToken) {
      checkWriteAccess(cToken);
    }
  }, [cToken]);

  const checkWriteAccess = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Decoded payload:", payload);
      const roles = payload.realm_access?.roles || [];
      console.log("User roles:", roles);
      if (roles.includes("buch-admin")) {
        setWriteAccess(true);
      } else {
        setWriteAccess(false);
      }
    } catch (error) {
      console.error("Error decoding token or setting write access:", error);
      setWriteAccess(false);
    }
  };
  
  

  const login = async (username, password) => {
    try {
      const response = await loginUser({ username, password });
      const { access_token } = response.data;
      setCToken(access_token);
      localStorage.setItem("cToken", access_token);
      checkWriteAccess(access_token);
      return true;
    } catch (error) {
      return false;
    }
  };

  const loginUser = async ({ username, password }) => {
    const url = "/api/auth/login";
    const requestData = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    try {
      const response = await axios.post(url, requestData);
      if (response.status === 200) {
        return response;
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setCToken("");
    setWriteAccess(false);
    localStorage.removeItem("cToken");
  };

  const isLoggedIn = () => {
    return cToken !== "";
  };

  return (
    <AuthContext.Provider
      value={{ cToken, writeAccess, login, logout, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
