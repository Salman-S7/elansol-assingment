import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import axios from "axios";

const Dashboard = () => {
    const { checkIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`https://dummyjson.com/users`);
      console.log(response.data);
      setUsersData(response.data.users);
    }
    const authenticated = checkIsAuthenticated();
    if (!authenticated) {
      navigate('/login');
    }
    getData();
  }, [usersData])
  
  

  return (
    <div>
      <DataTable>

      </DataTable>
    </div>
  )
}

export default Dashboard