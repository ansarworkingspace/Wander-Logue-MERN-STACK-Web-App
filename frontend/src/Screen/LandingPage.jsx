// import '../css/landingPage.css'
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaSearch, FaEye } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { Image } from 'react-bootstrap';
// import { Container, Card, Button } from 'react-bootstrap';

// const LandingPage = () => {


//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [searchQuery, setSearchQuery] = useState('');
//     const navigate = useNavigate();
//     const [selectedBannerMedia, setSelectedBannerMedia] = useState(null);




//     useEffect(() => {
//       const fetchBlogs = async () => {
//         try {
//           const response = await axios.get('https://ansaren.online/api/users/allBlogsLanding')
         
//           setBlogs(response.data);
//           setLoading(false);
//         } catch (error) {
//           console.error('Error fetching blogs:', error);
//           setError(error);
//           setLoading(false);
//         }
//       };
  
//       fetchBlogs();
//     }, []);
  
  
  
  
//     const handleSearch = (event) => {
//       setSearchQuery(event.target.value);
//     };
  
  
//     if (loading) {
//       return <div>Loading...</div>;
//     }
  
//     if (error) {
//       return <div>Error fetching blogs. Please try again later.</div>;
//     }
  
  
  
//     const filteredBlogs = blogs.filter((blog) =>
//       blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       blog.summary.toLowerCase().includes(searchQuery.toLowerCase())
//     );
  
  
  
  
  
  
//     const blogItems = filteredBlogs.length === 0 ? (
//       <p style={{ color: "white", fontFamily: "Sora", marginTop: "2rem" }}>No blogs found.</p>
//     ) : (
//       filteredBlogs.map((blog) => (
//         <div className='eachPost' key={blog._id}>
//           <div className='postImage'  style={{backgroundColor:"#181a1b"}}  >
//             {/* Display blog image here */}
//             {blog.images.length > 0 && (
             

//               getFileExtension(blog.images[0]) === 'mp4' ? (
//                 <video
//                   src={`https://ansaren.online/api/users/${blog.images[0]}`}
//                   controls
//                   className='postVideoOndiv'
//                 >
//                   Your browser does not support the video tag.
//                 </video>
//               ) : (
//                 <Image
//                   src={`https://ansaren.online/api/users/${blog.images[0]}`}
//                   alt='Blog'
//                   className='postImageOndiv'
//                 />
//               )


//             )}
//           </div>
//           <div className='postContentLanding'>
//             <h3>{blog.title}</h3>
//             <p className='summaryPosted'>{blog.summary}</p>
//             <p className='datePosted'>Created on: {new Date(blog.createdAt).toLocaleDateString()}</p>
//             <button className='iconInPostContentLanding' onClick={() => navigate(`/onlyView/${blog._id}`)}>
//               <FaEye />
//             </button>
//           </div>
//         </div>
//       ))
//     );
  
    


//     function getFileExtension(filename) {
//       return filename.split('.').pop();
//     }



//     useEffect(() => {
//       const fetchSelectedBanner = async () => {
//         try {
//           const response = await axios.get('https://ansaren.online/api/users/selectedBanner');
//           setSelectedBannerMedia(response.data.media);
//         } catch (error) {
//           console.error('Error fetching selected banner:', error);
//         }
//       };
  
//       fetchSelectedBanner();
//     }, []);


//     const bannerContent = selectedBannerMedia ? (
//       <div
//         className="bannerLanding"
//         style={{
//           background: `url(https://ansaren.online/api/users/${selectedBannerMedia}) no-repeat center center fixed`,
//           backgroundSize: 'cover',
//         }}
//       >
//         <div className="slogan">
//           <span>Explore. </span>
//           <span>Share.</span> Connect<span></span>
//         </div>
//         <div className="lanTitle">WanderLogue.</div>
//       </div>
//     ) : (
//       <div className="bannerLanding">
//         <div className="slogan">
//           <span>Explore. </span>
//           <span>Share.</span> Connect<span></span>
//         </div>
//         <div className="lanTitle">WanderLogue.</div>
//       </div>
//     );
  
    

//   return (

//     <div className="fullScreen">
      
//     {/* <div className='bannerLanding'>
//     <div class="slogan"><span>Explore. </span><span>Share.</span> Connect<span></span></div>
//     <div className='lanTitle'>WanderLogue.</div>
//     </div> */}




    
// {bannerContent}



//     <div className="topHomeLanding">
//         <h3>Latest Tales</h3>
//         <div className="search-bar-l">
//         <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearch} />
//           <button><FaSearch /></button>
//         </div>
//       </div>
//       <div className='proLine'></div>

//       <div className='allPostLandingpage'>
//         {blogItems}
       
//         <div className='proLine'></div>
//       </div>


//     </div>
//   )
// }

// export default LandingPage





import '../css/landingPage.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Container, Card, Button } from 'react-bootstrap';
import Loader from '../Components/Loader';




const LandingPage = () => {


    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBannerMedia, setSelectedBannerMedia] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();





  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const blogsResponse = await axios.get('https://ansaren.online/api/users/allBlogsLanding');
          setBlogs(blogsResponse.data);
    
          try {
            const selectedBannerResponse = await axios.get('https://ansaren.online/api/users/selectedBanner');
            if (selectedBannerResponse.data) {
              setSelectedBannerMedia(selectedBannerResponse.data.media);
            } else {
              setSelectedBannerMedia(null);
            }
          } catch (error) {
            console.error('Error fetching selected banner:', error);
          }
    
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error);
          setLoading(false);
        }
      };
    
      fetchData();
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
        <div className='eachPost fade-in' key={blog._id}>
          <div className='postImage'  style={{backgroundColor:"#181a1b"}}  >
            {/* Display blog image here */}
            {blog.images.length > 0 && (
             

              getFileExtension(blog.images[0]) === 'mp4' ? (
                <video
                  src={`https://ansaren.online/api/users/${blog.images[0]}`}
                  controls
                  className='postVideoOndiv'
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={`https://ansaren.online/api/users/${blog.images[0]}`}
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
            <button className='iconInPostContentLanding' onClick={() => navigate(`/onlyView/${blog._id}`)}>
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
    <>

    <div className="fullScreen">
      


{selectedBannerMedia ? (
  <div className="bannerLanding">

<div className="videoOverlay"></div> {/* Add this overlay */}
    <video
      src={`https://ansaren.online/api/users/${selectedBannerMedia}`}
      autoPlay
      loop
      muted
      className='bannerVideo'
    >
      Your browser does not support the video tag.
    </video>
   

<div className="textContainer">
      <div className="textOverlay">
        <div className="slogan">
          <span>Explore. </span>
          <span>Share.</span> Connect<span></span>
        </div>
        <div className="lanTitle">WanderLogue.</div>
      </div>
    </div>

  </div>
) : (
  <div className="bannerLanding">
    <div className="slogan">
      <span>Explore. </span>
      <span>Share.</span> Connect<span></span>
    </div>
    <div className="lanTitle">WanderLogue.</div>
  </div>
)}



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


    <div className='footer'>
 <div className='footerContent'>
 <h4 className='navbar-brand-custom' style={{marginLeft:"15rem"}}>WANDER<span style={{color:"#e8f32b"}}>LOGUE</span></h4>
 <p className='footerPara'>"Unleash Your Wanderlust with Our Travel Blogging App! Join us in sharing breathtaking moments, hidden gems, and unforgettable adventures from every corner of the globe. Connect with fellow explorers, ignite your wanderlust, and let your travel stories paint the world in vibrant hues. Your journey starts here."</p>
 </div>
</div>



    </>
  )
}

export default LandingPage



