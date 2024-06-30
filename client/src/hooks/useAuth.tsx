import { useContext } from "react"
import { AuthContext, AuthContextType } from "../context/AuthContext"

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Use Auth context inside Authprovider only");
  }
  return context;
};