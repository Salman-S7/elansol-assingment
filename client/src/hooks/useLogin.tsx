import axios from "axios";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export const useLogin = (): {
  loading: boolean,
  handleLogin: (email: string, password: string) => Promise<void>
} => {

  const [loading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const backendApi = import.meta.env.VITE_APP_BACKEND_API;
      if (!backendApi) {
        console.log("Backend api not found");
        throw new Error("Backend api not found");
      }
      const response = await axios.post(`${backendApi}/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        console.log("login succesfull");
        login(response.data.jwtToken);
        navigate('/')
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { loading, handleLogin };
};
