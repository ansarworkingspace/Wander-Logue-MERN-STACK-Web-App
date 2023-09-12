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

const TopPost = () => {
  const [topBlogs, setTopBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        
        </div>
      ))}
    </div>
  );
};

export default TopPost;


