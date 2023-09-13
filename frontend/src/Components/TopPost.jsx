// import React, { useState } from 'react';
// import '../css/topPost.css'

// const [isCardVisible, setIsCardVisible] = useState(true);

// const TopPost = () => {



//     const toggleCard = () => {
//         setIsCardVisible(!isCardVisible);
//       };


//   return (
//     <div className='topPost'>
      
//       <button onClick={toggleCard}>Toggle Card</button>
//       {isCardVisible && (
//         <div className='card'>
//           <div className='image'></div>
//           <div className='description'>
//             <h3>Card Title</h3>
//             <p>This is a card description.</p>
//           </div>
//         </div>
//       )}


//     </div>
//   )
// }

// export default TopPost

import React, { useState, useEffect } from 'react';
import '../css/topPost.css';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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


  function truncateSummary(summary) {
    const sentences = summary.split('. ');
    if (sentences.length < 3) {
      return summary;
    } else {
      const truncatedSummary = sentences.slice(0, 3).join('. ') + '......';
      return truncatedSummary;
    }
  }
  



  return (
    <div className='topPost'>
   
   {topBlogs.map((blog) => (
        <div className='topPostCard' key={blog._id} style={{ backgroundImage: `url(https://ansaren.online/api/users/${blog.images[0]})` }}>
         <div className="overlay"></div> 
         <div className="blogSummary">{truncateSummary(blog.summary)}</div>

        
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


