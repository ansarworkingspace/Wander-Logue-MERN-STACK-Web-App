
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Container, Card, Button } from 'react-bootstrap';
import '../css/landingAFL.css';
import TopPost from './TopPost';



const Hero = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/allblogs',{
       
        withCredentials: true, 
        });
       
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchBlogs();
  
  }, []);







  const handleScroll = () => {
    const blogContainer = document.querySelector('.allPostLanding');
    if (blogContainer) {
      const scrollY = window.scrollY;
      const blogElements = document.querySelectorAll('.eachPost');

      // Check each blog element's position and apply the fade-out class if it's above the viewport
      blogElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top + scrollY;
        if (elementTop < scrollY) {
          element.classList.add('fade-out');
        } else {
          element.classList.remove('fade-out');
        }
      });
    }
  };


 // Add an event listener to handle scrolling
 useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);










  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching blogs. Please try again later.</div>;
  }



  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );






  const blogItems = filteredBlogs.length === 0 ? (
    <p style={{ color: "white", fontFamily: "Sora", marginTop: "2rem" }}>No blogs found.</p>
  ) : (
    filteredBlogs.map((blog) => (
      <div className='eachPost fade-in' style={{backgroundColor:"#C8E4B2",border:"none"}} key={blog._id}>
        <div className='postImage' style={{backgroundColor:"#181a1b"}} >
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
        <div className='postContentLanding'>
          <h3>{blog.title}</h3>
          <p className='summaryPosted'>{blog.summary}</p>
          <p className='datePosted'>Created on: {new Date(blog.createdAt).toLocaleDateString()}</p>
          <button className='iconInPostContentLanding' onClick={() => navigate(`/allBlogs/${blog._id}`)}>
            <FaEye />
          </button>
        </div>
      </div>
    ))
  );

  function getFileExtension(filename) {
    return filename.split('.').pop();
  }



  return (
    <div className="landing-container">
      <div className="topHome">
        <h3>Latest Tales</h3>
        <div className="search-bar">
          <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
          <button><FaSearch /></button>
        </div>
      </div>
      <div className='proLine'></div>


{/* <TopPost/> */}


      {/* <div className='proLine'></div> */}

<div className='allPostLanding'>
        {blogItems}
        <div className='proLine'></div>
      </div>



    </div>
  );
};

export default Hero;
