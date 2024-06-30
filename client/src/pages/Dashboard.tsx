import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { checkIsAuthenticated } = useAuth();
    const navigate = useNavigate();

  useEffect(() => {
    const authenticated = checkIsAuthenticated();
    if (!authenticated) {
      navigate('/login');
    }
  },[])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard