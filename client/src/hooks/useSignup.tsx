import axios from "axios";
import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSignup = async (
    userName: string,
    dob: string,
    email: string,
    password: string
  ) => {
      
    try {
      setLoading(true);
      const backendApi = import.meta.env.VITE_APP_BACKEND_API;
      if (!backendApi) {
        console.log("Backend api not found");
        throw new Error("Backend api not found");
      }
      const response = await axios.post(`${backendApi}/signup`, {
        userName,
        dob,
        email,
        password,
      });
      console.log(response.data);
      console.log(response.status);
      if (response.status === 201) {
        console.log("Signup sucesfull");
        login(response.data.jwtToken);
        navigate("/");
      }

    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 409:
              alert("Username/Email already taken");
              break;
            case 500:
              alert("Internal server error");
              break;
            default:
              alert("Unknown error occured");
          }
        } else {
          alert("Network error, please try again");
        }
      } else {
        alert("Unknown error occured");
        console.error(error);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSignup };
};
