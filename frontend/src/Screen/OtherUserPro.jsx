
import React, { useState, useEffect } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faSave, faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/adminUserPRO.css';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'



const OtherUserPro = () => {

  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [userBlogs, setUserBlogs] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); 





  const handleFollowClick = () => {
    if (isFollowing) {
      // Unfollow logic
      axios
        .post(`http://localhost:4000/api/users/unfollow/${userId}`, null, {
          withCredentials: true,
        })
        .then(() => {
          setIsFollowing(false);
          setFollowerCount(prevCount => prevCount - 1); // Decrement follower count
        })
        .catch(error => {
          toast.error('Error unfollowing,try agian');
        });
    } else {
      // Follow logic
      axios
        .post(`http://localhost:4000/api/users/follow/${userId}`, null, {
          withCredentials: true,
        })
        .then(() => {
          setIsFollowing(true);
          setFollowerCount(prevCount => prevCount + 1); // Increment follower count
        })
        .catch(error => {
          toast.error('Error following,please try again');
        });
    }
  };






  useEffect(() => {
    // Check if current user is following the author
    axios.get(`http://localhost:4000/api/users/checkFollowing/${userId}`, {
      withCredentials: true,
    })
    .then(response => {
      setIsFollowing(response.data.isFollowing);
    })
    .catch(error => {
      console.error('Error checking following status:', error);
    });
  }, [userId]);




  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/users/authorProfile/${userId}`)
           
      .then(response => {
        setUserDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });



// Fetch user's blogs
axios
.get(`http://localhost:4000/api/users/getUserBlogs/${userId}`,{
withCredentials:true
})
.then(response => {
  setUserBlogs(response.data);
})
.catch(error => {
  console.error('Error fetching user blogs:', error);
});


  }, [userId]);


 


  useEffect(() => {
    // Fetch follower and following counts
    axios
      .get(`http://localhost:4000/api/users/followerFollowingCount/${userId}`, {
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
  }, [userId]);

  function getFileExtension(filename) {
    return filename.split('.').pop();
  }


  return (
    <div className="profile-container">
      <Link >
      <button className=" logout-button" onClick={handleFollowClick}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
      </Link>
      <Link to="/chatToUser">
        <button className="profile-edit-button">message</button>
      </Link>
      {userDetails ? (
        <>
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
      <h3 className="profile-name" style={{ fontFamily: "Squada One", color: "white", fontSize: "1.4rem" }}>
        {userDetails.name}
      </h3>
      <h5 style={{ color: "gray", fontSize: "0.6rem" }}>travel blogger</h5>

      <div className="profile-buttons">
        <div className="count-above-btn">
          <div className="profile-count">{followerCount}</div>
          <Link  to={`/OtherUserFollowersList/${userDetails._id}`}>
          <button className="follofollowingbtn" style={{width:"7rem"}}>Followers</button>
          </Link>
          
        </div>
        <div className="count-above-btn">
          <div className="profile-count">{followingCount}</div>
          <Link  to={`/OtherUserFollowingList/${userDetails._id}`}>
          <button className="follofollowingbtn" style={{width:"7rem"}}>Following</button>
          </Link>
     
        </div>
      </div>

      <div className='proLine'></div>

      <h4 className='allpostText'>{userDetails.name} Tales</h4>
          <div className='allPost'>
            {userBlogs.map((blog) => (
              <div className='eachPost' key={blog._id}>
                <div className='postImage'  style={{backgroundColor:"#181a1b"}} >
                  {/* Display blog image here */}
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
                    <button className='iconInPostContent' onClick={() => navigate(`/allBlogs/${blog._id}`)}><FaEye /></button>
                    {/* Add more buttons as needed */}
                  </div>
                </div>
              </div>
            ))}
            <div className='proLine'></div>
          </div>
          <div className='proLine'></div>
          </>
      ) : (
        <Loader /> // Show a loader or some placeholder while userDetails are being fetched
      )}
    </div>
  );
};

export default OtherUserPro;