import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Import the useState and useEffect hooks
import { Image } from 'react-bootstrap';
import { FaThumbsUp, FaBookmark, FaComment } from 'react-icons/fa'; 
import '../css/viewBlog.css';
import axios from 'axios';
import { useSelector,useDispatch } from "react-redux";
import {useAdminLogoutMutation  } from '../adminSlice/AdminApiSlice';
import {adminLogout } from '../adminSlice/AdminAuthSlice';
import { useNavigate } from 'react-router-dom';
import {toast}  from 'react-toastify'






const ViewBlog = () => {
  const { blogId } = useParams();
  const [selectedBlog, setSelectedBlog] = useState(null); // State to hold the selected blog details


  const navigate = useNavigate(); 
  const { adminInfo } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const [logoutApi] = useAdminLogoutMutation();
 
  useEffect(() => {
    const adminCheckAuth = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/admin/adminCheckAuth', {
                credentials: 'include' // Include cookies in the request
            });
            if (!response.ok) {
                await logoutApi().unwrap();
                dispatch(adminLogout());
                navigate('/admin/login');
            }
        } catch (error) {
          toast.error('Check auth error');
        }
    };

    if (adminInfo) {
        adminCheckAuth();
    }
}, [adminInfo, dispatch, logoutApi, navigate]);








  // useEffect(() => {
  //   // Fetch the selected blog details using the provided blogId
  //   fetch(`http://localhost:4000/api/admin/getOneBlogOfUser/${blogId}`)
    
    
  //   // Adjust the API route accordingly
  //     .then((response) => response.json())
  //     .then((data) => setSelectedBlog(data))
  //     .catch((error) => console.error(error));
  // }, [blogId]); // Fetch when blogId changes








  //give admin jwt
  useEffect(() => {
    // Fetch the selected blog details using the provided blogId
    axios.get(`http://localhost:4000/api/admin/getOneBlogOfUser/${blogId}`, {
      withCredentials: true, // Send credentials with the request
    })
    .then((response) => {
      const data = response.data;
      setSelectedBlog(data);
    })
    .catch((error) => {
      toast.error("Getting Error to fetch Selected blog");
    });
  }, [blogId]); // Fetch when blogId changes


  if (!selectedBlog) {
    return <p>Loading...</p>;
  }


  function getFileExtension(filename) {
    return filename.split('.').pop();
  }

  const secondImageOrVideoExists = selectedBlog.images.length > 1;

  return (
    <div className="viewBlog-container">

      <div className='titleView'>
      <h2>{selectedBlog.title}</h2>
      </div>

      <div className='blogDetails'>
      <p>Author: {selectedBlog.author.name}</p>
      <p>Created on: {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
      </div>


      <div className='proLine'></div>

      <div className='actionDetails'>
      <div className="iconWrapper">
          <FaThumbsUp />
        </div>
        <div className="iconWrapper">
          <FaBookmark />
        </div>
        <div className="iconWrapper">
          <FaComment />
        </div>
      </div>

      <div className='proLine'></div>

      <div className='imageView'>
        {selectedBlog.images.length > 0 && (
        // <Image
        //   src={`http://localhost:4000/api/users/${selectedBlog.images[0]}`}
        //   alt='Blog'
        //   className='viewImageOndiv'
        // />

        getFileExtension(selectedBlog.images[0]) === 'mp4' ? (
          <video
            src={`http://localhost:4000/api/users/${selectedBlog.images[0]}`}
            controls
            className='viewImageOndiv'
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={`http://localhost:4000/api/users/${selectedBlog.images[0]}`}
            alt='Blog'
            className='viewImageOndiv'
          />
        )



        )}
      </div>


      <div className='summaryDetails'>
      <p>{selectedBlog.summary}</p>
      </div>



      {secondImageOrVideoExists && (
        <div className='imageView'>
          {getFileExtension(selectedBlog.images[1]) === 'mp4' ? (
            <video
              src={`http://localhost:4000/api/users/${selectedBlog.images[1]}`}
              controls
              className='viewImageOndiv'
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={`http://localhost:4000/api/users/${selectedBlog.images[1]}`}
              alt='Blog'
              className='viewImageOndiv'
            />
          )}
        </div>
      )}

      {!secondImageOrVideoExists && <div className='proLine'></div>}



      {/* <div className='proLine'></div> */}

      <div className='contentView' dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
      
      
     
      
     
    </div>
  );
};

export default ViewBlog;
