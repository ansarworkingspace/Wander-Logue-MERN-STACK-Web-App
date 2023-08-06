

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';
import { Image } from 'react-bootstrap';
import '../css/profileScree.css'; 

const AdminUserPRview = () => {
  const [userDetails, setUserDetails] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const userEmail = new URLSearchParams(location.search).get('email');

    fetch(`http://localhost:4000/api/admin/userProfile?email=${userEmail}`)
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [location.search]);

  return (
    <div className="profile-container">
      {userDetails ? (
        <div>
          <div className="profile-picture">
            <div className="profile-image-container">
              {userDetails.profileImage ? (
                <Image
                  src={`http://localhost:4000/api/users/uploads/${userDetails.profileImage}`}
                  alt="Profile"
                  className="profile-image"
                  roundedCircle
                />
              ) : (
                <div className="profile-initials">
                  {userDetails.name ? userDetails.name.charAt(0).toUpperCase() : ''}
                </div>
              )}
            </div>
          </div>
          <h3 className="profile-name">{userDetails.name}</h3>

          <div className="profile-buttons">
            <div className="count-above-btn">
              <div className="profile-count">145k</div>
              <button className="follofollowingbtn">Followers</button>
            </div>
            <div className="count-above-btn">
              <div className="profile-count">1016</div>
              <button className="follofollowingbtn">Following</button>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AdminUserPRview;
