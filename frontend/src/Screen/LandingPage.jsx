import '../css/landingPage.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Container, Card, Button } from 'react-bootstrap';

const LandingPage = () => {


    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/users/allBlogsLanding')
         
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
  
    





    

  return (

    <div className="fullScreen">
      
    <div className='bannerLanding'>
    <div class="slogan"><span>Explore. </span><span>Share.</span> Connect<span></span></div>
    <div className='lanTitle'>WanderLogue.</div>
    </div>

    <div className="topHomeLanding">
        <h3>Latest Tales</h3>
        <div className="search-bar-l">
        <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
          <button><FaSearch /></button>
        </div>
      </div>
      <div className='proLine'></div>

      <div className='allPostLandingpage'>
        {blogItems}
       
        <div className='proLine'></div>
      </div>


    </div>
  )
}

export default LandingPage


