
// import '../css/savedBlogs.css';

// const SavedBlogs = () => {


//   return (
//     <div className="savedBlog-container">
//       <div className='headingSavedBlog'>
//         <h4 className='titleOfSavedBlog'>Your Saved List Of Blogs</h4>
//       </div>
//       <div className='proLine'></div>

//       <div className='allPost'>
       
        
      
//       </div>
//     </div>
//   );
// };

// export default SavedBlogs;



// components/SavedBlogs.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/savedBlogs.css';
import { useNavigate } from 'react-router-dom'; 
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaEye, FaTrash, FaEdit } from 'react-icons/fa';







const SavedBlogs = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const navigate = useNavigate();



  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/getSavedBlogs', {
          withCredentials: true
        });
        // setSavedBlogs(response.data);
        setSavedBlogs(response.data.reverse());
      } catch (error) {
        console.error('Error fetching saved blogs:', error);
      }
    };

    fetchSavedBlogs();
  }, []);





  const handleDeleteBlog = async (blogId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/users/deleteSavedBlog/${blogId}`, {
        withCredentials: true
      });
      if (response.status === 200) {
        // Blog deleted successfully, update savedBlogs state
        const updatedSavedBlogs = savedBlogs.filter(blog => blog.blogId !== blogId);
        setSavedBlogs(updatedSavedBlogs);
      }
    } catch (error) {
      console.error('Error deleting saved blog:', error);
    }
  };


  const blogItems = savedBlogs.map((blog) => (
    <div className='eachPost' key={blog._id}>
      <div className='postImage'>
        {/* Display blog image here */}
        {blog.images.length > 0 && (
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
          <button className='iconInPostContent' onClick={() => navigate(`/savedSingleBlogs/${blog.blogId}`)}  >
          <FaEye />
          </button>
          <button className='iconInPostContent' onClick={() => handleDeleteBlog(blog.blogId)} >
          <FaTrash />
          </button>
          
        </div>
      </div>
    </div>
  ));






  return (
    <div className="savedBlog-container">
      <div className='headingSavedBlog'>
        <h4 className='titleOfSavedBlog'>Your Saved List Of Blogs</h4>
      </div>
      <div className='proLine'></div>

      <div className='allPost'>
      {blogItems}
        <div className='proLine'></div>
      </div>
    </div>
  );
};

export default SavedBlogs;
