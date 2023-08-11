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


 // Set the user image from userInfo
 const userImage = userInfo.profileImage
 ? `http://localhost:4000/api/users/uploads/${userInfo.profileImage}`
 : null;




const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className='postImage'>
        {/* Display blog image here */}
        {blog.images.length > 0 && (
          // <Image src={`http://localhost:4000/api/users/${blog.images[0]}`} alt='Blog' />

          <Image
          src={`http://localhost:4000/api/users/${blog.images[0]}`}
          alt='Blog'
          className='postImageOndiv'
        />
        )}
      </div>
      <div className='postContent'>
        {/* Display blog title, summary, and creation date */}
        <h3>{blog.title}</h3>
        <p className='summaryPosted summaryExpand'>{blog.summary}</p>
        <p className='datePosted'>Created on: {new Date(blog.createdAt).toLocaleDateString()}</p>
        <div className='iconInPostContentGroup'>
              <button className='iconInPostContent' onClick={() => navigate(`/allBlogs/${blog._id}`)}  ><FaEye /></button>
              <button className='iconInPostContent'><FaTrash /></button>
              <button className='iconInPostContent'><FaEdit /></button>
            </div>
      </div>
    </div>
    
  ));
  

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

    <h4 className='allpostText'>Your Tales</h4>
    <div className='allPost'>
          {/* <div className='eachPost'>
            <div className='postImage'>

            </div>
            <div className='postContent'>


               <div className='iconInPostContentGroup'>
              <button className='iconInPostContent'><FaEye /></button>
              <button className='iconInPostContent'><FaTrash /></button>
              <button className='iconInPostContent'><FaEdit /></button>
            </div>
          </div>
  
          </div> */}


{blogItems}

          <div className='proLine'></div>
                  


</div>
<div className='proLine'></div>





    </div>
    
  );
  

  
};

export default ProfileScreen;



