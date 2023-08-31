import TableComponent from "../Components/Table";
import React from "react";
import axios from "axios";
import { useEffect,useState } from "react"
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { FaSearch, FaEye } from 'react-icons/fa';
import '../css/adminHome.css'
import { useSelector,useDispatch } from "react-redux";
import {useAdminLogoutMutation  } from '../adminSlice/AdminApiSlice';
import {adminLogout } from '../adminSlice/AdminAuthSlice';
import { useNavigate } from 'react-router-dom';





const AdminHomeScreen = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);



  const navigate = useNavigate(); 
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const [logoutApi] = useAdminLogoutMutation();
 
  useEffect(() => {
    const adminCheckAuth = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/admin/adminCheckAuth', {
                credentials: 'include' // Include cookies in the request
            });
            if (!response.ok) {
                await logoutApi().unwrap();
                dispatch(adminLogout());
                navigate('/admin/login');
            }
        } catch (error) {
            // console.error('Check auth error:', error);
            toast.error("An error occurred while checking authentication. Please try again later.");
        }
    };

    if (adminInfo) {
        adminCheckAuth();
    }
}, [adminInfo, dispatch, logoutApi, navigate]);




  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/admin/adminHome ",{
           withCredentials:true
        })

        // const response = await axios.get("http://localhost:4000/api/admin/adminHome ")

        setUser(response.data.users);
        setLoading(false); 
      } catch (error) {
        toast.error("Error fetching users");
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