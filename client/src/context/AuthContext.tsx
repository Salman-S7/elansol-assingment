import { FC, ReactNode, createContext, useState } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  checkIsAuthenticated: () => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkIsAuthenticated = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      return false;
    }
    return true;
  }

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ checkIsAuthenticated, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
