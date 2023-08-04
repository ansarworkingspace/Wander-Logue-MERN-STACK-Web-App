import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { useUpdateUserMutation } from '../slices/UserApiSlice';
import { setCredentials } from '../slices/AuthSlice';
import '../css/profileScree.css'; // Import the CSS file

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  return (
    <div className="profile-container">
      <button className="profile-edit-button">Edit Profile</button>
      <div className="profile-picture">
        {name ? name.charAt(0).toUpperCase() : ''}
      </div>
      <h3 className="profile-name">{name}</h3>
     
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
  );
  
  
  
  
  
};

export default ProfileScreen;
