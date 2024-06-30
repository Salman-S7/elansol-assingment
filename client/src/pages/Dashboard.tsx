import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    })

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard