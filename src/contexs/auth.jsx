import { createContext, useContext, useState,useEffect } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token")
      ? localStorage.getItem("token")
      : null,
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
