import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button, Image } from 'react-bootstrap';// Import React Bootstrap components
import axios from 'axios';
import '../css/FollowList.css';
import { useNavigate,useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import {toast} from 'react-toastify'




const LikeUsers = () => {
  const [likedUsers, setLikedUsers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchQuery, setSearchQuery] = useState(''); 
  const { userInfo } = useSelector((state) => state.auth);
  const currentUserId =userInfo._id

  const { blogId } = useParams();

  useEffect(() => {
    async function fetchLikedUsers() {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/LikedUsers/${blogId}`)
  
        setLikedUsers(response.data);
      } catch (error) {
        // Handle error
        toast.error('Error fetching liked users');
      }
    }
  
    fetchLikedUsers();
  }, [blogId]);
  


 


 // Handle search query change
 const handleSearch = (event) => {
  setSearchQuery(event.target.value);
};

// Filter followingUsers based on searchQuery
const filteredLikedUsers = likedUsers.filter((user) =>
  user.name.toLowerCase().includes(searchQuery.toLowerCase())
);


const navigateToUserProfile = (userId) => {
    if (userId === currentUserId) {
      navigate('/profile');
    } else {
      navigate(`/otherUserPro/${userId}`);
    }
  };



  return (
    <div className="FollowList-container">
      <div className="topHomeLanding">
        <h3>Liked Users List</h3>
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
        {filteredLikedUsers.map(user => {
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
               
                <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none"}}  onClick={() => navigateToUserProfile(user._id)}>Profile </Button>
              </div>
            </div>
          );
        })}
      </div>

     
     
    </div>
  );
};

export default LikeUsers;
