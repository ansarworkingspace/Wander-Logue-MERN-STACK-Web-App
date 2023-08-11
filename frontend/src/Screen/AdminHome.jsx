import TableComponent from "../Components/Table";
import React from "react";
import axios from "axios";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { FaSearch, FaEye } from 'react-icons/fa';
import '../css/adminHome.css'

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
    <div className="viewAllUsers-container">

      <div className='titleViewAdmin'>
      <h1>User Data</h1>
      </div>
      
      

      <div className='proLine'></div>


      {loading ? <Loader/> : null}
      <TableComponent users={user} />
    </div>
  );
};

export default AdminHomeScreen;


// import '../css/viewBlog.css';

// const ViewBlog = () => {

//   return (
//     <div className="viewBlog-container">
      
//     </div>
//   );
// };

// export default ViewBlog;