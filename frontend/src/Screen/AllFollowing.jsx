


import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Button, Image } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/FollowList.css';
import { toast } from 'react-toastify';


const AllFollowing = () => {
  const [followingUsers, setFollowingUsers] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchFollowingList() {
      try {
        const response = await axios.get('https://ansaren.online/api/users/followingList', {
          withCredentials: true,
        });

        setFollowingUsers(response.data);
      } catch (error) {
        toast.error('Error fetching following list');
      }
    }

    fetchFollowingList();
  }, []);

  const userPro = (userId) => {
    navigate(`/otherUserPro/${userId}`);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFollowingUsers = followingUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );





  const handleChatButtonClick = async (userId) => {
    try {
      const response = await axios.get(
        `https://ansaren.online/api/users/createOrGetChatRoom/${userId}`,
        
        { withCredentials: true }
      );
  
      // Navigate to chat page with chat roomID
      // console.log(response.data.chatRoomId);
      navigate(`/ChatRoomWithDirect/${response.data.chatRoomId}`);
    } catch (error) {
      toast.error('Error creating or getting chat room');
    }
  };






  return (
    <div className="FollowList-container">
      <div className="topHomeLanding">
        <h3>All Following Users</h3>
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
                {userImage ? (
                  <Image src={userImage} alt="Profile" className="followingImage" roundedCircle />
                ) : (
                  <div className="profile-initials">{user.name ? user.name.charAt(0).toUpperCase() : ''}</div>
                )}
              </div>
              <div className='nameOfFollowingUser'>
                {user.name}
              </div>
              <div className='unfollowBtn' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: "1rem", paddingRight: "1rem", height: "2.5rem" }}>
                <Button variant="danger" className="unfollow-button" style={{ backgroundColor: "#7EAA92", border: "none" }} onClick={() => userPro(user._id)}>Profile</Button>
                <Button variant="danger" className="unfollow-button" style={{ backgroundColor: "#7EAA92", border: "none" }} onClick={() => handleChatButtonClick(user._id)}  >Chat</Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllFollowing;
