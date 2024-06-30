/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom";
import DataTable, { TableColumn } from 'react-data-table-component';
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
  }, [])
  

  const columns: TableColumn<any>[] = [
    {
      name: "Image",
      selector: (row) => row.image,
      cell: (row) => (
        <img
          src={row.image}
          alt={row.username}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "2px solid gray",
          }}
        />
      ),
      sortable: false,
    },
    {
      name: "Name",
      selector: (row: { firstName: string }) => row.firstName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: { email: string }) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row: { phone: string }) => row.phone,
      sortable: true,
    },
    {
      name: "BirthDate",
      selector: (row: { birthDate: string }) => row.birthDate,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
  ];


  return (
    <div className="h-[100vh]">
      <DataTable
        // theme="dark"
        title="User Data"
        columns={columns}
        data={usersData}
        striped
        fixedHeader
        highlightOnHover
        pagination
        responsive
        // customStyles={customStyles}
      />
    </div>
  );
}

export default Dashboard