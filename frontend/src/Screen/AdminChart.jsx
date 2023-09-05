
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


import React, { useState, useEffect } from 'react';
import '../css/adminBanner.css';
import '../css/reportAdmin.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../css/adminChart.css';

const AdminChart = () => {
  const [activeUsersCount, setActiveUsersCount] = useState(null);
  const [activePostsCount, setActivePostsCount] = useState(null);

// bar state
const [averageValue, setAverageValue] = useState(70);
const [minValue, setMinValue] = useState(40);
const [maxValue, setMaxValue] = useState(90);

useEffect(() => {
  const updateDataWithAnimation = () => {
    const randomAverageValue = Math.floor(Math.random() * 100);
    const randomMinValue = Math.floor(Math.random() * 100);
    const randomMaxValue = Math.floor(Math.random() * 100);

    setAverageValue(randomAverageValue);
    setMinValue(randomMinValue);
    setMaxValue(randomMaxValue);
  };

  updateDataWithAnimation(); // Start the animation once when the component mounts

  // Clean up the interval on unmount
  return () => {};
}, []);





  useEffect(() => {
    
    // const fetchCounts = async () => {
    //   try {
    //     // Fetch active users count
    //     const activeUsersResponse = await axios.get('/api/activeUsers');
    //     const activeUsersCount = activeUsersResponse.data.count;
    //     setActiveUsersCount(activeUsersCount);

    //     // Fetch active posts count
    //     const activePostsResponse = await axios.get('/api/activePosts');
    //     const activePostsCount = activePostsResponse.data.count;
    //     setActivePostsCount(activePostsCount);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     toast.error('Error fetching data');
    //   }
    // };

    // fetchCounts();

    // Generate random numbers for testing purposes (replace with actual data)
    const generateRandomNumbers = () => {
      const randomUsersCount = Math.floor(Math.random() * 100);
      const randomPostsCount = Math.floor(Math.random() * 100);
      setActiveUsersCount(randomUsersCount);
      setActivePostsCount(randomPostsCount);
    };

    // Call the function to generate random numbers for testing
    generateRandomNumbers();
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
     <h5 style={{fontSize:"0.8rem",marginTop:"3rem",color:"rgb(255 255 255)",marginLeft:"7rem"}}>Total Users Registered</h5>
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
           <h5 style={{fontSize:"0.8rem",marginTop:"3rem",color:"rgb(255 255 255)",marginLeft:"7rem"}}>Total Users Registered</h5>
        </div>
      </div>
      <div className='proLine'></div>
      <div className="topHomeLanding">
        <h3>Top followed Users</h3>
      </div>


      <div className="topUserschart">
        <div className="bar">
          <div className="bar-label">Average</div>
          <div className="bar-graph">
            <div className="bar-fill" style={{ height: `${averageValue}%` }}></div>
          </div>
        </div>

        <div className="bar">
          <div className="bar-label">Minimum</div>
          <div className="bar-graph">
            <div className="bar-fill" style={{ height: `${minValue}%` }}></div>
          </div>
        </div>

        <div className="bar">
          <div className="bar-label">Maximum</div>
          <div className="bar-graph">
            <div className="bar-fill" style={{ height: `${maxValue}%` }}></div>
            <h5 style={{fontSize:"0.8rem",marginTop:"3rem",color:"rgb(255 255 255)",marginLeft:"1rem"}}>Total Users Registered</h5>
          </div>
        </div>
      </div>


    </div>
  );
};

export default AdminChart;
