// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import Loader from '../Components/Loader';
// import { useUpdateUserMutation } from '../slices/UserApiSlice';
// import { setCredentials } from '../slices/AuthSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import '../css/editprofile.css'


// const EditProfile = () => {
//     const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [mobile, setMobile] = useState('');
//   const dispatch = useDispatch();

//   const { userInfo } = useSelector((state) => state.auth);

//   const [updateProfile, { isLoading }] = useUpdateUserMutation();

//   useEffect(() => {
//     setName(userInfo.name);
//     setEmail(userInfo.email);
//     setMobile(userInfo.mobile);
    
//   }, [userInfo.email, userInfo.name,userInfo.mobile]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//     } else {
//       try {
//         const res = await updateProfile({
//           _id: userInfo._id,
//           name,
//           email,
//           password,
//           mobile
          
//         }).unwrap();
//         console.log(res);
//         dispatch(setCredentials(res));
//         toast.success('Profile updated successfully');
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <div className="edit-profile-container">
//       <form onSubmit={submitHandler} className="edit-profile-form">
        

//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <label htmlFor="password">New Password</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//        <label htmlFor="conformPassword">Confirm New Password</label>
//         <input
//           type="password"
//           id="confirmPassword"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//        <label htmlFor="mobile">Mobile</label>
//         <input
//           type="text"
//           id="mobile"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />
//         <button type="submit" className="edit-profile-button">Save Changes</button>
//         {isLoading && <Loader />}
//       </form>
//     </div>
//   );
// };

// export default EditProfile;



//checking code 

// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import Loader from '../Components/Loader';
// import { useUpdateUserMutation } from '../slices/UserApiSlice';
// import { setCredentials } from '../slices/AuthSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import '../css/editprofile.css';

// const EditProfile = () => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [profileImage, setProfileImage] = useState(null); // Store the selected image
 
//   const dispatch = useDispatch();

//   const { userInfo } = useSelector((state) => state.auth);
  

//   const [updateProfile, { isLoading }] = useUpdateUserMutation();

  
//   useEffect(() => {
//     setName(userInfo.name);
//     setEmail(userInfo.email);
//     setMobile(userInfo.mobile);
//     setProfileImage(`http://localhost:4000/api/users/uploads/${userInfo.profileImage}`)
//   }, [userInfo.email, userInfo.name, userInfo.mobile,userInfo.profileImage]);

//   const handleImageUpload = (e) => {
//     const imageFile = e.target.files[0];
//     setProfileImage(imageFile);
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//     } else {
//       try {
//         const formData = new FormData();
//         formData.append('_id', userInfo._id);
//         formData.append('name', name);
//         formData.append('email', email);
//         formData.append('password', password);
//         formData.append('mobile', mobile);
//         formData.append('profileImage', profileImage);

//         const res = await updateProfile(formData).unwrap();
//         dispatch(setCredentials(res));
        
//         toast.success('Profile updated successfully');
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <div className="edit-profile-container">
//       <form onSubmit={submitHandler} className="edit-profile-form">
//         <label htmlFor="name">Name</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

// <label htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <label htmlFor="password">New Password</label>
//         <input
//           type="password"
//           id="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//        <label htmlFor="conformPassword">Confirm New Password</label>
//         <input
//           type="password"
//           id="confirmPassword"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//        <label htmlFor="mobile">Mobile</label>
//         <input
//           type="text"
//           id="mobile"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//         />


// {/* {profileImage && (
//           <img
//             src={profileImage}
//             alt="Profile"
//             className="current-profile-image"
//           />
//         )}

//         <label htmlFor="profileImage">Profile Image</label>
//         <input
//           type="file"
//           id="profileImage"
        
//           accept="image/*"
//           onChange={handleImageUpload}
//         /> */}


// {profileImage && (
//   <div className="image-container">
//     <img
//       src={profileImage}
//       alt="Profile"
//       className="current-profile-image"
//     />
//     <label htmlFor="profileImage">Profile Image</label>
//   </div>
// )}

// <input
//   type="file"
//   id="profileImage"
//   accept="image/*"
//   onChange={handleImageUpload}
// />


//         <button type="submit" className="edit-profile-button">
//           Save Changes
//         </button>
//         {isLoading && <Loader />}
//       </form>
//     </div>
//   );
// };

// export default EditProfile;//ORGINAL WORKING CODE 


import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loader from '../Components/Loader';
import { useUpdateUserMutation } from '../slices/UserApiSlice';
import { setCredentials } from '../slices/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import '../css/editprofile.css';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/UserApiSlice';
import { logout } from '../slices/AuthSlice';





const EditProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState(null); // Store the selected image
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateUserMutation();
  const [logoutApiCall] = useLogoutMutation();
  const navigate = useNavigate();









//check jwt
useEffect(() => {
  const checkAuth = async () => {
      try {
          const response = await fetch('http://localhost:4000/api/users/checkAuth', {
              credentials: 'include' // Include cookies in the request
          });
          if (!response.ok) {
              await logoutApiCall().unwrap();
              dispatch(logout());
              navigate('/landing');
          }
      } catch (error) {
        toast.error('Check auth error:', error);
      }
  };

  if (userInfo) {
      checkAuth();
  }
}, [userInfo, dispatch, logoutApiCall, navigate]);








  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/status/${userInfo._id}`);
        const data = await response.json();

        if (data.status) {
          await logoutApiCall().unwrap();
          dispatch(logout());
          navigate('/landing');
        }
      } catch (error) {
        toast.error('Fetch user status error:', error);
      }
    };

    if (userInfo) {
      fetchUserStatus();
    }
  }, [userInfo, dispatch, logoutApiCall, navigate]);







  
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setMobile(userInfo.mobile);
    if (userInfo.profileImage) {
      setProfileImage(`http://localhost:4000/api/users/uploads/${userInfo.profileImage}`);
    } else if (userInfo.profileGoogleImage) {
      setProfileImage(userInfo.profileGoogleImage);
    }




  }, [userInfo.email, userInfo.name, userInfo.mobile,userInfo.profileImage ]);






  const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    setProfileImage(imageFile);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const formData = new FormData();
        formData.append('_id', userInfo._id);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('mobile', mobile);
        formData.append('profileImage', profileImage);

        const res = await updateProfile(formData).unwrap();
        dispatch(setCredentials(res));
        
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="edit-profile-container">
      <form onSubmit={submitHandler} className="edit-profile-form">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

<label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       <label htmlFor="conformPassword">Confirm New Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
       <label htmlFor="mobile">Mobile</label>
        <input
          type="text"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />


{/* {profileImage && (
          <img
            src={profileImage}
            alt="Profile"
            className="current-profile-image"
          />
        )}

        <label htmlFor="profileImage">Profile Image</label>
        <input
          type="file"
          id="profileImage"
        
          accept="image/*"
          onChange={handleImageUpload}
        /> */}


{profileImage && (
  <div className="image-container">
    <img
      src={profileImage}
      alt="Profile"
      className="current-profile-image"
    />
    <label htmlFor="profileImage">Profile Image</label>
  </div>
)}

<input
  type="file"
  id="profileImage"
  accept="image/*"
  onChange={handleImageUpload}
/>


        <button type="submit" className="edit-profile-button">
          Save Changes
        </button>
        {isLoading && <Loader />}
      </form>
    </div>
  );
};

export default EditProfile;
