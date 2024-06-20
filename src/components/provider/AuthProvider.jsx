import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [cToken, setCToken] = useState(localStorage.getItem("cToken") || "");
  const [writeAccess, setWriteAccess] = useState(false);

  useEffect(() => {
    if (cToken) {
      setWriteAccess(true);
    }
  }, [cToken]);

  const login = async (username, password) => {
    try {
      const response = await loginUser({ username, password });
      const { access_token } = response.data;
      console.log(response.data);
      console.log("TEST")
      setCToken(access_token);
      localStorage.setItem("cToken", access_token);
      setWriteAccess(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const loginUser = async ({ username, password }) => {
    const url = "/api/auth/login";
    const requestData = `username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;

    const response = await axios.post(url, requestData);
    if (response.status === 200) {
      return response;
    } else {
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

  console.log(cToken);

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
