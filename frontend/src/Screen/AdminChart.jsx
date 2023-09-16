


import React, { useState, useEffect } from 'react';
import '../css/adminBanner.css';
import '../css/reportAdmin.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/adminChart.css';
import axios from 'axios';


const AdminChart = () => {
  const [activeUsersCount, setActiveUsersCount] = useState(null);
  const [activePostsCount, setActivePostsCount] = useState(null);
  const [topUsers, setTopUsers] = useState([]);
  const [topLikedBlogs, setTopLikedBlogs] = useState([]);




//total count of users and blogs
useEffect(() => {
  // Fetch the total number of users
  const fetchTotalUsersCount = async () => {
    try {
      const response = await axios.get('https://ansaren.online/api/admin/countOfTotalUsers');
      const totalUsersCount = response.data.totalUsersCount;
      setActiveUsersCount(totalUsersCount);
    } catch (error) {
      console.error('Error fetching total users count:', error);
      toast.error('Error fetching total users count');
    }
  };

  // Fetch the total number of blogs (similar to the users count)
  const fetchTotalBlogsCount = async () => {
    try {
      const response = await axios.get('https://ansaren.online/api/admin/countOfTotalBlogs');
      const totalBlogsCount = response.data.totalBlogsCount;
      setActivePostsCount(totalBlogsCount); // Set the state for blogs count
    } catch (error) {
      console.error('Error fetching total blogs count:', error);
      toast.error('Error fetching total blogs count');
    }
  };



  // Fetch the top 3 users with the most followers
  const fetchTopUsersWithMostFollowers = async () => {
    try {
      const response = await axios.get('https://ansaren.online/api/admin/topUsersWithMostFollowers');
      const topUsersData = response.data;
      setTopUsers(topUsersData);
    } catch (error) {
      console.error('Error fetching top users with most followers:', error);
      toast.error('Error fetching top users with most followers');
    }
  };



  const fetchTopLikedBlogs = async () => {
    try {
      const response = await axios.get('https://ansaren.online/api/admin/topLikedBlogs');
      setTopLikedBlogs(response.data);
      
    } catch (error) {
      console.error('Error fetching top liked blogs:', error);
      toast.error('Error fetching top liked blogs');
    }
  };



  // Call both fetch functions
  fetchTotalUsersCount();
  fetchTotalBlogsCount();
  fetchTopUsersWithMostFollowers();
  fetchTopLikedBlogs();
}, []);



  return (
    <div className="banner-container">
      <div className="topHomeLanding">
        <h3>Chart of Wanderlouge</h3>
      </div>

      <div className="userschart">
        {/* Active Users */}
        <div className="activeUsers">
        {activeUsersCount !== null ? (
          <div className="circle">
            <div className="animated-circle"></div>
            <div className="number">{activeUsersCount}</div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <h5 style={{ fontSize: "0.8rem", marginTop: "3rem", color: "rgb(255 255 255)", marginLeft: "7rem" }}>Total Users Registered</h5>
      </div>


        {/* Active Posts */}
        <div className="activePost">
        {activePostsCount !== null ? (
          <div className="circle">
            <div className="animated-circle"></div>
            <div className="number">{activePostsCount}</div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <h5 style={{ fontSize: "0.8rem", marginTop: "3rem", color: "rgb(255 255 255)", marginLeft: "8rem" }}>Total Blogs Posted</h5>
      </div>




      </div>
      <div className='proLine'></div>
      <div className="topHomeLanding">
        <h3>Top followed Users</h3>
      </div>


      <div className="topUserschart">
        {topUsers.map((user, index) => (
          <div className="bar" key={index}>
            <div className="bar-label">Top {index + 1}</div>
            <div className="bar-graph">
            <div className="bar-fill" style={{ height: index === 0 ? '10%' : index === 1 ? '39%' : '65%' }}></div>
            <h5 style={{ fontSize: "0.8rem", marginTop: "3rem", color: "rgb(5, 80, 73)", marginLeft: "-0.2rem" }}>{user.followersCount} Followers </h5>
            </div>
            <h5 style={{ fontSize: "0.8rem", marginTop: "3rem", color: "rgb(255 255 255)", marginLeft: "-0.2rem" }}>{user.name}</h5>
          </div>
        ))}
      </div>

      <div className='proLine'></div>
      <div className="topHomeLanding">
        <h3>Top three blogs</h3>
      </div>

      <div className="topUserschart">
  {topLikedBlogs.map((blog, index) => (
    <div className="bar" key={blog._id}>
      <div className="bar-label">Top {index + 1}</div>
      <div className="bar-graph">
        <div className="bar-fill" style={{ height: index === 0 ? '10%' : index === 1 ? '39%' : '65%' }}></div>
        <h5 style={{ fontSize: "0.8rem", marginTop: "3rem", color: "rgb(5, 80, 73)", marginLeft: "-0.2rem" }}>{blog.likes.length} Likes </h5>
      </div>
      <h5  style={{ fontSize: "0.8rem", marginTop: "3rem", color: "rgb(255 255 255)", marginLeft: "-0.2rem" }}>{blog.title}</h5>
    </div>
  ))}
</div>



    </div>
  );
};

export default AdminChart;
