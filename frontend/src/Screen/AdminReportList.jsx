

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/adminBanner.css';
import '../css/reportAdmin.css';
import {useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';


const AdminReportList = () => {
  const [reportedBlogs, setReportedBlogs] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    fetchReportedBlogs();
  }, []);

  const fetchReportedBlogs = async () => {
    try {
      const response = await axios.get('https://ansaren.online/api/admin/reportedBlogs',{
        withCredentials: true
      });
      if (response.data && response.data.length > 0) {
        setReportedBlogs(response.data);
      }
    } catch (error) {
      toast.error("Error fetching reported blogs");
      // console.error('Error fetching reported blogs:', error);
    }
  };



//REPORT BLOG

const deleteBlog = async (blogId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');

    if (confirmDelete) {
      try {
        const response = await axios.delete(`https://ansaren.online/api/admin/deleteBlog/${blogId}`,{
          withCredentials: true
        });

        if (response.status === 200) {
          toast.success('Blog deleted successfully');
          fetchReportedBlogs(); // Refresh the list of reported blogs
        } else {
          toast.error('Error deleting blog');
        }
      } catch (error) {
        // console.error('Error deleting blog:', error);
        toast.error("Error deleting blog");
        
      }
    }
  };






  return (
    <div className="banner-container">
      <div className="topHomeLanding">
        <h3>Report Listing</h3>
      </div>
      {/* <div className='reportBox'>
        {reportedBlogs.map((blog) => (
          <div key={blog._id} className="reportedBlog">
            <h4 style={{ fontSize: '1rem'}}>{blog.reportReason}</h4>
            <button className='buttonReportBoxView' onClick={() => viewBlog(blog._id)}>Report Blog</button>
            <button className='buttonReportBox'>View Blog</button>
          </div>
        ))}
      </div> */}

{reportedBlogs.map((blog) => ( 
    <div className='reportBox' key={blog._id}>
      <h4 style={{ fontSize: '1rem'}}>{blog.reportReason}</h4>
      <button className='buttonReportBoxView' onClick={() => deleteBlog(blog._id)}>Report Blog</button>
      <button className='buttonReportBox' onClick={() => navigate(`/admin/viewBlogAdmin/${blog._id}`)} >View Blog</button>
    </div>
  ))}

    </div>
  );
};

export default AdminReportList;
