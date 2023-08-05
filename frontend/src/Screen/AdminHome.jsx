import TableComponent from "../Components/Table";
import React from "react";
import axios from "axios";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";
import Loader from "../Components/Loader";


const AdminHomeScreen = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/adminHome ");
        
        setUser(response.data.users);
        setLoading(false); 
      } catch (error) {
        toast.error(error);
        console.error("Error fetching users:", error);
        setLoading(false); 
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Data</h1>
      {loading ? <Loader/> : null}
      <TableComponent users={user} />
    </div>
  );
};

export default AdminHomeScreen;