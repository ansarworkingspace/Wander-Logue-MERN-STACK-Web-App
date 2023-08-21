

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
          const response = await fetch('http://localhost:4000/api/users/checkAuth', {
              credentials: 'include' // Include cookies in the request
          });
          if (!response.ok) {
              await logoutApiCall().unwrap();
              dispatch(logout());
              navigate('/landing');
          }
      } catch (error) {
          console.error('Check auth error:', error);
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
      .get(`http://localhost:4000/api/users/followerFollowingCount/${userInfo._id}`, {
        withCredentials: true,
      })
      .then(response => {
        setFollowerCount(response.data.followerCount);
        setFollowingCount(response.data.followingCount);
      })
      .catch(error => {
        console.error('Error fetching follower and following counts:', error);
      });

    // ... other useEffect dependencies ...
  }, [userInfo]);




//check user status
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
        console.error('Fetch user status error:', error);
      }
    };

    if (userInfo) {
      fetchUserStatus();
    }
  }, [userInfo, dispatch, logoutApiCall, navigate]);











  const handleDeleteBlog = async (blogId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this blog?');

    if (!shouldDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/api/users/deleteBlog/${blogId}`, {
        withCredentials: true,
      });
      // Remove the deleted blog from the local state
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };





  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };



  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);




//fetch image
const userImage = userInfo.profileImage
? `http://localhost:4000/api/users/uploads/${userInfo.profileImage}`
: userInfo.profileGoogleImage // Use the Google profile image link here
? userInfo.profileGoogleImage
: null;

const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //fetch blog
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/blogs', {
          withCredentials: true, // Send cookies with the request
        });

        setBlogs(response.data);
        setLoading(false); // Set loading to false on successful fetch
      } catch (error) {
        console.error('Error fetching blogs:', error);
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
            src={`http://localhost:4000/api/users/${blog.images[0]}`}
            controls
            className='postVideoOndiv'
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={`http://localhost:4000/api/users/${blog.images[0]}`}
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
      <h3 className="profile-name" style={{fontFamily:"Squada One",color:"white",fontSize:"1.4rem"}}>{name}</h3>
      <h5 style={{color:"gray",fontSize:"0.6rem"}}>travel blogger</h5>

      <div className="profile-buttons">
        <div className="count-above-btn">
          <div className="profile-count">{followerCount}</div>
          <button className="follofollowingbtn">Followers</button>
        </div>
        <div className="count-above-btn">
          <div className="profile-count">{followingCount}</div>
          <button className="follofollowingbtn">Following</button>
        </div>


      </div>
      <div className='showcase'>
      <div className='icon'>
        <FontAwesomeIcon icon={faPen} size='lg' className='pro' />
        <span className='icon-text'>Pen</span>
      </div>
      <div className='icon'>
        
        <FontAwesomeIcon icon={faSave} size='lg' className='pro' onClick={()=>navigate('/savedblogs')} />
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


