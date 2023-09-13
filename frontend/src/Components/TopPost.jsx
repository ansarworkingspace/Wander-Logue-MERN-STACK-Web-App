

import React, { useState, useEffect } from 'react';
import '../css/topPost.css';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopPost = () => {
  const [topBlogs, setTopBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userInfo } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const fetchTopBlogs = async () => {
      try {
        const response = await axios.get('https://ansaren.online/api/users/topThreepost');
        setTopBlogs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchTopBlogs();
  }, []);





  return (
    <div className='topPost'>
   
   {topBlogs.map((blog) => (
        <div className='topPostCard' key={blog._id} style={{ backgroundImage: `url(https://ansaren.online/api/users/${blog.images[0]})` }}>
         <div className="overlay"></div> 
         <div className="blogSummary">{blog.summary}</div>

        
         {userInfo ? ( // Check if userInfo is true
            <Link to={`/allBlogs/${blog._id}`} className="navLink">
            <div className="blogTitle">{blog.title}</div>
            </Link>
          ) : (
            <Link to={`/onlyView/${blog._id}`} className="navLink">
               <div className="blogTitle">{blog.title}</div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopPost;


