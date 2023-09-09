
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../css/adminBanner.css';
// import '../css/reportAdmin.css';
// import {useNavigate } from 'react-router-dom'; 
// import { toast } from 'react-toastify';
// import '../css/adminChart.css'

// const AdminChart = () => {

//   return (
//     <div className="banner-container">
//       <div className="topHomeLanding">
//         <h3>Chat of users</h3>
//       </div>
  
// {/* div for carring how many users used this app */}

// <div className='userschart'>

// {/* totalusers number display */}
// <div className='activeUsers'>

// </div>

// {/* totalpost number display */}
// <div className='activePost'>
  
// </div>


// </div>



//     </div>
//   );
// };

// export default AdminChart;


// import React, { useState, useEffect } from 'react';
// import '../css/adminBanner.css';
// import '../css/reportAdmin.css';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import '../css/adminChart.css';
// import axios from 'axios';


// const AdminChart = () => {
//   const [activeUsersCount, setActiveUsersCount] = useState(null);
//   const [activePostsCount, setActivePostsCount] = useState(null);

// // bar state
// const [averageValue, setAverageValue] = useState(70);
// const [minValue, setMinValue] = useState(40);
// const [maxValue, setMaxValue] = useState(90);

// useEffect(() => {
//   const updateDataWithAnimation = () => {
//     const randomAverageValue = Math.floor(Math.random() * 100);
//     const randomMinValue = Math.floor(Math.random() * 100);
//     const randomMaxValue = Math.floor(Math.random() * 100);

//     setAverageValue(randomAverageValue);
//     setMinValue(randomMinValue);
//     setMaxValue(randomMaxValue);
//   };

//   updateDataWithAnimation(); // Start the animation once when the component mounts

//   // Clean up the interval on unmount
//   return () => {};
// }, []);





//   // useEffect(() => {


//   //   // Generate random numbers for testing purposes (replace with actual data)
//   //   const generateRandomNumbers = () => {
//   //     const randomUsersCount = Math.floor(Math.random() * 100);
//   //     const randomPostsCount = Math.floor(Math.random() * 100);
//   //     setActiveUsersCount(randomUsersCount);
//   //     setActivePostsCount(randomPostsCount);
//   //   };

//   //   // Call the function to generate random numbers for testing
//   //   generateRandomNumbers();
//   // }, []);


// //total count of users and blogs
// useEffect(() => {
//   // Fetch the total number of users
//   const fetchTotalUsersCount = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/admin/countOfTotalUsers');
//       const totalUsersCount = response.data.totalUsersCount;
//       setActiveUsersCount(totalUsersCount);
//     } catch (error) {
//       console.error('Error fetching total users count:', error);
//       toast.error('Error fetching total users count');
//     }
//   };

//   // Fetch the total number of blogs (similar to the users count)
//   const fetchTotalBlogsCount = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/api/admin/countOfTotalBlogs');
//       const totalBlogsCount = response.data.totalBlogsCount;
//       setActivePostsCount(totalBlogsCount); // Set the state for blogs count
//     } catch (error) {
//       console.error('Error fetching total blogs count:', error);
//       toast.error('Error fetching total blogs count');
//     }
//   };

//   // Call both fetch functions
//   fetchTotalUsersCount();
//   fetchTotalBlogsCount();
// }, []);



//   return (
//     <div className="banner-container">
//       <div className="topHomeLanding">
//         <h3>Chart of Wanderlouge</h3>
//       </div>

//       <div className="userschart">
//         {/* Active Users */}
//         <div className="activeUsers">
//         {activeUsersCount !== null ? (
//           <div className="circle">
//             <div className="animated-circle"></div>
//             <div className="number">{activeUsersCount}</div>
//           </div>
//         ) : (
//           <div>Loading...</div>
//         )}
//         <h5 style={{ fontSize: "0.8rem", marginTop: "3rem", color: "rgb(255 255 255)", marginLeft: "7rem" }}>Total Users Registered</h5>
//       </div>


//         {/* Active Posts */}
//         <div className="activePost">
//         {activePostsCount !== null ? (
//           <div className="circle">
//             <div className="animated-circle"></div>
//             <div className="number">{activePostsCount}</div>
//           </div>
//         ) : (
//           <div>Loading...</div>
//         )}
//         <h5 style={{ fontSize: "0.8rem", marginTop: "3rem", color: "rgb(255 255 255)", marginLeft: "8rem" }}>Total Blogs Posted</h5>
//       </div>




//       </div>
//       <div className='proLine'></div>
//       <div className="topHomeLanding">
//         <h3>Top followed Users</h3>
//       </div>


//       <div className="topUserschart">
//         <div className="bar">
//           <div className="bar-label">Minimum</div>
//           <div className="bar-graph">
//             <div className="bar-fill" style={{ height: `${averageValue}%` }}></div>
//           </div>
//           <h5 style={{fontSize:"0.8rem",marginTop:"3rem",color:"rgb(255 255 255)",marginLeft:"-0.2rem"}}>Total Users Registered</h5>
//         </div>

//         <div className="bar">
//           <div className="bar-label">Average</div>
//           <div className="bar-graph">
//             <div className="bar-fill" style={{ height: `${minValue}%` }}></div>
//           </div>
//           <h5 style={{fontSize:"0.8rem",marginTop:"3rem",color:"rgb(255 255 255)",marginLeft:"-0.2rem"}}>Total Users Registered</h5>
//         </div>

//         <div className="bar">
//           <div className="bar-label">Maximum</div>
//           <div className="bar-graph">
//             <div className="bar-fill" style={{ height: `${maxValue}%` }}></div>
           
//           </div>
//           <h5 style={{fontSize:"0.8rem",marginTop:"3rem",color:"rgb(255 255 255)",marginLeft:"-0.2rem"}}>Total Users Registered</h5>
//         </div>
//       </div>


//     </div>
//   );
// };

// export default AdminChart;




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
      const response = await axios.get('http://localhost:4000/api/admin/countOfTotalUsers');
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
      const response = await axios.get('http://localhost:4000/api/admin/countOfTotalBlogs');
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
      const response = await axios.get('http://localhost:4000/api/admin/topUsersWithMostFollowers');
      const topUsersData = response.data;
      setTopUsers(topUsersData);
    } catch (error) {
      console.error('Error fetching top users with most followers:', error);
      toast.error('Error fetching top users with most followers');
    }
  };



  const fetchTopLikedBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/topLikedBlogs');
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
