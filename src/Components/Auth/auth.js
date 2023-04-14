import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [empID, setEmpID] = useState(null);

  const login = (user, empID) => {
    setUser(user);
    setEmpID(empID);
  };

  const logout = () => {
    setUser(null);
    setEmpID(null);
  };

  return (
    <AuthContext.Provider value={{ user, empID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
