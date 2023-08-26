

// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react'; // Import the useState and useEffect hooks
// import { Image } from 'react-bootstrap';
// import { FaThumbsUp, FaBookmark, FaComment } from 'react-icons/fa'; 
// import '../css/viewBlog.css';
// const ViewBlog = () => {
//   const { blogId } = useParams();
 
//   const [selectedBlog, setSelectedBlog] = useState(null); // State to hold the selected blog details
//   const [liked, setLiked] = useState(false); // State to manage like/unlike
//   const [likeCount, setLikeCount] = useState(0);
  



//   const handleBookmarkClick = async () => {
//     try {
//       await axios.post(`http://localhost:4000/api/users/saveBlog/${selectedBlog._id}`, null, {
//   withCredentials: true,
// });

//     } catch (error) {
//       console.error('Error saving blog:', error);
//     }
//   };





  

//   useEffect(() => {
//     axios.get(`http://localhost:4000/api/users/countLike/${blogId}`)
//       .then(response => {
//         setLikeCount(response.data.likeCount);
//       })
//       .catch(error => {
//         console.error('Error fetching like count:', error);
//       });

//     // Check if the user has liked this blog post
//     axios.get(`http://localhost:4000/api/users/checkLike/${blogId}`, {
//       withCredentials: true,
//     })
//       .then(response => {
//         setLiked(response.data.userLiked);
//       })
//       .catch(error => {
//         console.error('Error checking like status:', error);
//       });
//   }, [blogId]);




//   useEffect(() => {
//     // Fetch the selected blog details using the provided blogId
//     fetch(`http://localhost:4000/api/users/getOneBlog/${blogId}`) // Adjust the API route accordingly
//       .then((response) => response.json())
//       .then((data) => setSelectedBlog(data))
//       .catch((error) => console.error(error));
//   }, [blogId]); // Fetch when blogId changes orginal



  

//   const handleLikeClick = async () => {
//     try {
//       await axios.post(`http://localhost:4000/api/users/likeBlog/${selectedBlog._id}`, null, {
//         withCredentials: true,
//       });
// // Update the like count locally based on like/unlike
//       setLikeCount(prevLikeCount => (liked ? prevLikeCount - 1 : prevLikeCount + 1));
     
//       setLiked(!liked);
//     } catch (error) {
//       console.error('Error liking/unliking blog:', error);
//     }
//   };



//   if (!selectedBlog) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="viewBlog-container">

//       <div className='titleView'>
//       <h2>{selectedBlog.title}</h2>
//       </div>

//       <div className='blogDetails'>
//       <p>Author: {selectedBlog.author.name}</p>
//       <p>Created on: {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
//       </div>

//       <div className='proLine'></div>

//       <div className='actionDetails'>
//       <div
//           className="iconWrapper"
//           style={{
//             display: 'flex',
//             flexDirection: 'row',
//             color: liked ? '#f93131' : 'white',
//             cursor: 'pointer',
//           }}
//           onClick={handleLikeClick} // Call handleLikeClick on click
//         >
//           <FaThumbsUp />
//           <h4  style={{color:"white", fontSize: "0.8rem", marginLeft: "0.7rem", marginTop: "0.2rem" }}>
//           {likeCount}
//           </h4>
//         </div>
//         <div className="iconWrapper" onClick={handleBookmarkClick}>
//           <FaBookmark />
//         </div>
//         <div className="iconWrapper">
//           <FaComment />
//         </div>
//       </div>

//       <div className='proLine'></div>

//       <div className='imageView'>
//         {selectedBlog.images.length > 0 && (
//         <Image
//           src={`http://localhost:4000/api/users/${selectedBlog.images[0]}`}
//           alt='Blog'
//           className='viewImageOndiv'
//         />
//         )}
//       </div>


//       <div className='summaryDetails'>
//       <p>{selectedBlog.summary}</p>
//       </div>

//       <div className='proLine'></div>

//       <div className='contentView' dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
      
      
     
      
     
//     </div>
//   );
// };

// export default ViewBlog;






import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'; // Import the useState and useEffect hooks
import { Image } from 'react-bootstrap';
import { FaThumbsUp, FaBookmark, FaComment } from 'react-icons/fa'; 
import '../css/viewBlog.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const ViewBlog = () => {


  const { userInfo } = useSelector((state) => state.auth);
  const currentUserId =userInfo._id
  const navigate = useNavigate() 





  const { blogId } = useParams();
  const [selectedBlog, setSelectedBlog] = useState(null); // State to hold the selected blog details
  const [liked, setLiked] = useState(false); // State to manage like/unlike
  const [likeCount, setLikeCount] = useState(0);
  


  const handleBookmarkClick = async () => {
    try {
      await axios.post(`http://localhost:4000/api/users/saveBlog/${selectedBlog._id}`, null, {
  withCredentials: true,
});

  toast.success('This blog saved in your collection!')

    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };





  

  useEffect(() => {
    axios.get(`http://localhost:4000/api/users/countLike/${blogId}`)
      .then(response => {
        setLikeCount(response.data.likeCount);
      })
      .catch(error => {
        console.error('Error fetching like count:', error);
      });

    // Check if the user has liked this blog post
    axios.get(`http://localhost:4000/api/users/checkLike/${blogId}`, {
      withCredentials: true,
    })
      .then(response => {
        setLiked(response.data.userLiked);
      })
      .catch(error => {
        console.error('Error checking like status:', error);
      });
  }, [blogId]);




  useEffect(() => {
    // Fetch the selected blog details using the provided blogId
    fetch(`http://localhost:4000/api/users/getOneBlog/${blogId}`) // Adjust the API route accordingly
      .then((response) => response.json())
      .then((data) => setSelectedBlog(data))
      .catch((error) => console.error(error));
  }, [blogId]); // Fetch when blogId changes orginal



  

  const handleLikeClick = async () => {
    try {
      await axios.post(`http://localhost:4000/api/users/likeBlog/${selectedBlog._id}`, null, {
        withCredentials: true,
      });
// Update the like count locally based on like/unlike
      setLikeCount(prevLikeCount => (liked ? prevLikeCount - 1 : prevLikeCount + 1));
     
      setLiked(!liked);
    } catch (error) {
      console.error('Error liking/unliking blog:', error);
    }
  };



  if (!selectedBlog) {
    return <p>Loading...</p>;
  }


  function getFileExtension(filename) {
    return filename.split('.').pop();
  }


  const secondImageOrVideoExists = selectedBlog.images.length > 1;

  return (
    <div className="viewBlog-container">
<Link to={`/reportBlog/${selectedBlog._id}`}>
        <button className="profile-edit-button" >Report Blog</button>
      </Link>
      <div className='titleView'>
      <h2>{selectedBlog.title}</h2>
      </div>

      <div className='blogDetails'>
      {/* <p>Author: {selectedBlog.author.name}</p> */}






      <p>
        Author: {selectedBlog.author.name}{' '}
        <span
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => {
            if (selectedBlog.author._id === currentUserId) {
              navigate('/profile');
            } else {
             navigate(`/otherUserPro/${selectedBlog.author._id}`);
            }
          }}
        >
          (Profile)
        </span>
      </p>







      <p>Created on: {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
      </div>

      <div className='proLine'></div>

      <div className='actionDetails'>
      <div
          className="iconWrapper"
          style={{
            display: 'flex',
            flexDirection: 'row',
            color: liked ? '#f93131' : 'white',
            cursor: 'pointer',
          }}
          onClick={handleLikeClick} // Call handleLikeClick on click
        >
          <FaThumbsUp />
       
          <h4  style={{color:"white", fontSize: "0.8rem", marginLeft: "0.7rem", marginTop: "0.2rem" }}>
          {likeCount} 
          </h4>
      
          
         
        </div>
        <div className="iconWrapper" onClick={handleBookmarkClick}>
          <FaBookmark />
        </div>
        <div className="iconWrapper">
          <FaComment />
        </div>
      </div>
         <Link to={`/LikeUsers/${selectedBlog._id}`} style={{ textDecoration: 'none' }}>
<div className='likedText' style={{marginRight:"28rem"}}><h4 style={{fontFamily:"Sora",fontSize:"0.7rem",color:'white'}}>( liked users )</h4></div> 
         </Link>
   
      <div className='proLine'></div>

      <div className='imageView'>
        {selectedBlog.images.length > 0 && (
     

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
