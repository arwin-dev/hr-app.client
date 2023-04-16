import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [empID, setEmpID] = useState(null);
  const [manager, setManager] = useState(false);

  const login = (user, empID) => {
    setUser(user);
    setEmpID(empID);
  };

  const logout = () => {
    setUser(null);
    setEmpID(null);
    setManager(false)
  };

  const managerAuth = () => {
    setManager(true);
  }

  return (
    <AuthContext.Provider value={{ user, empID, manager,login, logout, managerAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
