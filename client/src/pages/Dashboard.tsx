/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";

const Dashboard = () => {
  const { logout, checkIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://dummyjson.com/users`);
        setUsersData(response.data.users);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const authenticated = checkIsAuthenticated();
    if (!authenticated) {
      navigate("/login");
    }
    getData();
  }, []);

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
            border: "2px solid black",
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
      <div className="w-[100%] h-[10vh] flex justify-end items-center px-4">
        <button
          className="border-none bg-blue-500 rounded-md
          px-4 py-2 text-white font-bold hover:bg-blue-800"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      {loading ? (
        <h1
          className="w-[100%] h-[90vh] flex items-center justify-center text-4xl
        font-extrabold text-slate-900"
        >
          Loading ...
        </h1>
      ) : (
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
      )}
    </div>
  );
};

export default Dashboard;
