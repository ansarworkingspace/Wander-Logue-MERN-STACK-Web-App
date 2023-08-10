import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { useUpdateUserMutation } from '../slices/UserApiSlice';
import { setCredentials } from '../slices/AuthSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPen, faSave, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';

import '../css/profileScree.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

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

 // Set the user image from userInfo
 const userImage = userInfo.profileImage
 ? `http://localhost:4000/api/users/uploads/${userInfo.profileImage}`
 : null;

  return (
    <div className="profile-container">
      <Link to="/editprofile">
        <button className="profile-edit-button">Edit Profile</button>
      </Link>
      {/* <div className="profile-picture">
        {name ? name.charAt(0).toUpperCase() : ''}
      </div>
      <h3 className="profile-name">{name}</h3> */}
     
     <div className="profile-picture">
        <div className="profile-image-container">
          {userImage ? (
            <Image src={userImage} alt="Profile" className="profile-image" roundedCircle />
          ) : (
            <div className="profile-initials">{name ? name.charAt(0).toUpperCase() : ''}</div>
          )}
        </div>
      </div>
      <h3 className="profile-name" style={{fontFamily:"Squada One",color:"white",fontSize:"1.4rem"}}>{name}</h3>
      <h5 style={{color:"gray",fontSize:"0.6rem"}}>travel blogger</h5>

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
      <div className='showcase'>
      <div className='icon'>
        <FontAwesomeIcon icon={faPen} size='lg' className='pro' />
        <span className='icon-text'>Pen</span>
      </div>
      <div className='icon'>
        <FontAwesomeIcon icon={faSave} size='lg' className='pro' />
        <span className='icon-text'>Save</span>
      </div>
      <div className='icon'>
        <FontAwesomeIcon icon={faHeart} size='lg' className='pro' />
        <span className='icon-text'>Like</span>
      </div>
      <div className='icon'>
        <FontAwesomeIcon icon={faComment} size='lg' className='pro' />
        <span className='icon-text'>Chat</span>
      </div>
    </div>
    <div className='proLine'></div>


    <div className='allPost'>
          <div className='eachPost'>
            <div className='postImage'>

            </div>
            <div className='postContent'>


               <div className='iconInPostContentGroup'>
              <button className='iconInPostContent'><FaEye /></button>
              <button className='iconInPostContent'><FaTrash /></button>
              <button className='iconInPostContent'><FaEdit /></button>
            </div>
          </div>
  
          </div>

          <div className='proLine'></div>
          <div className='eachPost'>
            <div className='postImage'>

            </div>
            <div className='postContent'>


               <div className='iconInPostContentGroup'>
              <button className='iconInPostContent'><FaEye /></button>
              <button className='iconInPostContent'><FaTrash /></button>
              <button className='iconInPostContent'><FaEdit /></button>
            </div>
          </div>
  
          </div>

          <div className='proLine'></div>

          <div className='eachPost'>
            <div className='postImage'>

            </div>
            <div className='postContent'>


               <div className='iconInPostContentGroup'>
              <button className='iconInPostContent'><FaEye /></button>
              <button className='iconInPostContent'><FaTrash /></button>
              <button className='iconInPostContent'><FaEdit /></button>
            </div>
          </div>
  
          </div>

          <div className='proLine'></div>


</div>
<div className='proLine'></div>





    </div>
    
  );
  
  
  
  
  
};

export default ProfileScreen;
