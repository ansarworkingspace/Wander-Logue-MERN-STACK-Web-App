

import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios'; 
import { useLogoutMutation } from '../slices/UserApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import { logout } from '../slices/AuthSlice';
import { useNavigate } from 'react-router-dom'; 
import '../css/profileScree.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import {toast} from 'react-toastify'

import Swal from 'sweetalert2';



const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [blogs, setBlogs] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Initialize useHistory
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);








//check jwt
useEffect(() => {
  const checkAuth = async () => {
      try {
          const response = await fetch('https://ansaren.online/api/users/checkAuth', {
              credentials: 'include' // Include cookies in the request
          });
          if (!response.ok) {
              await logoutApiCall().unwrap();
              dispatch(logout());
              navigate('/landing');
          }
      } catch (error) {
        toast.error('Check auth error');
      }
  };

  if (userInfo) {
      checkAuth();
  }
}, [userInfo, dispatch, logoutApiCall, navigate]);











//user following count
  useEffect(() => {
    // Fetch follower and following counts
    axios
      .get(`https://ansaren.online/api/users/followerFollowingCount/${userInfo._id}`, {
        withCredentials: true,
      })
      .then(response => {
        setFollowerCount(response.data.followerCount);
        setFollowingCount(response.data.followingCount);
      })
      .catch(error => {
        toast.error('Error fetching follower and following counts');
      });

    // ... other useEffect dependencies ...
  }, [userInfo]);




//check user status
  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const response = await fetch(`https://ansaren.online/api/users/status/${userInfo._id}`);
        const data = await response.json();

        if (data.status) {
          await logoutApiCall().unwrap();
          dispatch(logout());
          navigate('/landing');
        }
      } catch (error) {
        toast.error('Fetch user status error');
      }
    };

    if (userInfo) {
      fetchUserStatus();
    }
  }, [userInfo, dispatch, logoutApiCall, navigate]);










//orginal handle of delete
  // const handleDeleteBlog = async (blogId) => {
  //   const shouldDelete = window.confirm('Are you sure you want to delete this blog?');

  //   if (!shouldDelete) {
  //     return;
  //   }

  //   try {
  //     await axios.delete(`https://ansaren.online/api/users/deleteBlog/${blogId}`, {
  //       withCredentials: true,
  //     });
  //     // Remove the deleted blog from the local state
  //     setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
  //   } catch (error) {
  //     toast.error('Error deleting blog');
  //   }
  // };




  const handleDeleteBlog = async (blogId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });
  
      if (result.isConfirmed) {
        await axios.delete(`https://ansaren.online/api/users/deleteBlog/${blogId}`, {
          withCredentials: true,
        });
        // Remove the deleted blog from the local state
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
  
        Swal.fire('Deleted!', 'Your blog has been deleted.', 'success');
      }
    } catch (error) {
      toast.error('Error deleting blog');
    }
  };
  









  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      toast.error("Error while logouting");
    }
  };



  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);




//fetch image
const userImage = userInfo.profileImage
? `https://ansaren.online/api/users/uploads/${userInfo.profileImage}`
: userInfo.profileGoogleImage // Use the Google profile image link here
? userInfo.profileGoogleImage
: null;

const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //fetch blog
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://ansaren.online/api/users/blogs', {
          withCredentials: true, // Send cookies with the request
        });

        setBlogs(response.data);
        setLoading(false); // Set loading to false on successful fetch
      } catch (error) {
        toast.error('Error fetching blogs');
        setError(error); // Set the error state on fetch error
        setLoading(false); // Set loading to false on fetch error
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching blogs. Please try again later.</div>;
  }
  const blogItems = blogs.map((blog) => (
    <div className='eachPost' key={blog._id}>
      <div className='postImage' style={{backgroundColor:"#181a1b"}}>
       



{blog.images.length > 0 && (
        getFileExtension(blog.images[0]) === 'mp4' ? (
          <video
            src={`https://ansaren.online/api/users/${blog.images[0]}`}
            controls
            className='postVideoOndiv'
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={`https://ansaren.online/api/users/${blog.images[0]}`}
            alt='Blog'
            className='postImageOndiv'
          />
        )
      )}




      </div>
      <div className='postContent'>
        {/* Display blog title, summary, and creation date */}
        <h3>{blog.title}</h3>
        <p className='summaryPosted summaryExpand'>{blog.summary}</p>
        <p className='datePosted'>Created on: {new Date(blog.createdAt).toLocaleDateString()}</p>
        <div className='iconInPostContentGroup'>
              <button className='iconInPostContent' onClick={() => navigate(`/allBlogs/${blog._id}`)}  ><FaEye /></button>
              <button className='iconInPostContent' onClick={() => handleDeleteBlog(blog._id)}>
          <FaTrash />
        </button>
              <button className='iconInPostContent'  onClick={() => navigate(`/editBlog/${blog._id}`)} ><FaEdit /></button>
            </div>
      </div>
    </div>
    
  ));
  // Function to get the file extension from a filename
function getFileExtension(filename) {
  return filename.split('.').pop();
}

  return (
    <div className="profile-container" >
       <Link onClick={logoutHandler}>
        <button className="logout-button">Logout</button>
      </Link>
      <Link to="/editprofile">
        <button className="profile-edit-button">Edit Profile</button>
      </Link>
    
     
     <div className="profile-picture">
        <div className="profile-image-container">
          {userImage ? (
            <Image src={userImage} alt="Profile" className="profile-image" roundedCircle />
          ) : (
            <div className="profile-initials">{name ? name.charAt(0).toUpperCase() : ''}</div>
          )}
        </div>
      </div>
      <h3 className="profile-name" style={{fontFamily:"Phudu",color:"white",fontSize:"1rem"}}>{name}</h3>
      {/* <h5 style={{color:"gray",fontSize:"0.6rem"}}>travel blogger</h5> */}

      <div className="profile-buttons">
        <div className="count-above-btn">
          <div className="profile-count">{followerCount}</div>
          <Link to='/followersList'>
          <button className="follofollowingbtn">Followers</button>
          </Link>
        </div>
        <div className="count-above-btn">
          <div className="profile-count">{followingCount}</div>
          <Link to='/followingList'>
          <button className="follofollowingbtn">Following</button>
          </Link>
        </div>


      </div>
      <div className='showcase'>
      <div className='icon' style={{cursor:"pointer"}}>
      <Link to={'/create'}>
        <FontAwesomeIcon icon={faPen} size='lg' className='pro' />
        </Link>
        <span className='icon-text'>Pen</span>
      </div>
      <div className='icon' style={{cursor:"pointer"}}>
        
        <FontAwesomeIcon icon={faSave} size='lg' className='pro' onClick={()=>navigate('/savedblogs')} />
        <span className='icon-text'>Save</span>
      </div>
      <div className='icon' style={{cursor:"pointer"}}>
        <FontAwesomeIcon icon={faHeart} size='lg' className='pro' />
        <span className='icon-text'>Like</span>
      </div>
      <div className='icon' style={{cursor:"pointer"}}>
        <Link to={'/chatRoom'}>
        <FontAwesomeIcon icon={faComment} size='lg' className='pro' />
        </Link>
        <span className='icon-text'>Chat</span>
        
      </div>
    </div>
    <div className='proLine'></div>

    <h4 className='allpostText'>Your Tales</h4>
    <div className='allPost'>
          

{blogItems}

          <div className='proLine'></div>
                  


</div>
<div className='proLine'></div>





    </div>
    
  );
  

  
};

export default ProfileScreen;


