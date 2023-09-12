import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button, Image } from 'react-bootstrap';// Import React Bootstrap components
import axios from 'axios';
import '../css/FollowList.css';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'





const FollowersList = () => {
  const [followerUsers, setFollowerUsers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    async function fetchFollowingList() {
      try {
        const response = await axios.get('https://ansaren.online/api/users/followersList', {
          withCredentials: true, // Send cookies with the request
        });

        setFollowerUsers(response.data);
      } catch (error) {
        // Handle error
        toast.error('Error fetching following list');
      }
    }

    fetchFollowingList();
  }, []);


  const userPro = (userId) => {
    navigate(`/otherUserPro/${userId}`); // Use navigate to navigate
  };




 // Handle search query change
 const handleSearch = (event) => {
  setSearchQuery(event.target.value);
};

// Filter followingUsers based on searchQuery
const filteredFollowingUsers = followerUsers.filter((user) =>
  user.name.toLowerCase().includes(searchQuery.toLowerCase())
);



  return (
    <div className="FollowList-container">
      <div className="topHomeLanding">
        <h3>Followers List</h3>
        <div className="search-bar-l">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
          <button><FaSearch /></button>
        </div>
      </div>

      <div className='listContainer'>
        {filteredFollowingUsers.map(user => {
          const userImage = user.profileImage
            ? `https://ansaren.online/api/users/uploads/${user.profileImage}`
            : user.profileGoogleImage
            ? user.profileGoogleImage
            : null;

          return (
            <div className='followingBox' key={user._id}>
              <div className='imageONbox'>
                {/* Use React Bootstrap Image component */}
                {userImage ? (
                  <Image  src={userImage} alt="Profile" className="followingImage" roundedCircle />
                ) : (
                  <div className="profile-initials">{user.name ? user.name.charAt(0).toUpperCase() : ''}</div>
                )}
              </div>
              <div className='nameOfFollowingUser'>
                {user.name}
              </div>
              <div className='unfollowBtn'>
                {/* Use React Bootstrap Button component with color variant */}
               
                <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none"}}  onClick={() => userPro(user._id)}>Profile </Button>
              </div>
            </div>
          );
        })}
      </div>

     
     
    </div>
  );
};

export default FollowersList;
