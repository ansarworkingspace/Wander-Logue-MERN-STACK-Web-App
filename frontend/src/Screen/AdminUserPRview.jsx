import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../Components/Loader';

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
          <h2>{userDetails.name}</h2>
          <p>Email: {userDetails.email}</p>
          {/* Display other user details */}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AdminUserPRview;
