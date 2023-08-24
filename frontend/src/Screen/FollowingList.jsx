import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button, Image } from 'react-bootstrap';// Import React Bootstrap components
import axios from 'axios';
import '../css/FollowList.css';
import { useNavigate } from 'react-router-dom';

const FollowingList = () => {
  const [followingUsers, setFollowingUsers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    async function fetchFollowingList() {
      try {
        const response = await axios.get('http://localhost:4000/api/users/followingList', {
          withCredentials: true, // Send cookies with the request
        });

        setFollowingUsers(response.data);
      } catch (error) {
        // Handle error
        console.error('Error fetching following list:', error);
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
const filteredFollowingUsers = followingUsers.filter((user) =>
  user.name.toLowerCase().includes(searchQuery.toLowerCase())
);

  return (
    <div className="FollowList-container">
           <div className="topHomeLanding">
        <h3>Following List</h3>
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
            ? `http://localhost:4000/api/users/uploads/${user.profileImage}`
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
               
                <Button variant="danger" className="unfollow-button"  onClick={() => userPro(user._id)}>Profile </Button>
              </div>
            </div>
          );
        })}
      </div>

     
     
    </div>
  );
};

export default FollowingList;
