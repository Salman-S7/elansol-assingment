import axios from "axios";
import { useState } from "react"
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
            console.log(response.data)
            console.log(response.status);
            if (response.status ===   201) {
                console.log("Signup sucesfull");

                login(response.data.jwtToken);
                navigate('/');
                
            } else if (response.status === 409) {
                console.log("Username/Email already exists")
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    return { loading, handleSignup };

}