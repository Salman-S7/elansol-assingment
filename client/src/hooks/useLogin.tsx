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
        login(response.data.jwtToken);
        navigate('/');
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              alert("Provide all credentials");
              break;
            case 401:
              alert("Invalid credentials");
              break;
            case 500:
              alert("Internal server error");
              break;
            default:
              alert("Error please try again");
          }
        } else if (error.request) {
          alert("No response received from server");
        } else {
          alert("Unepected error happened, try again");
        }
      } else {
        alert("Network error. Please try again later.");
        
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { loading, handleLogin };
};
