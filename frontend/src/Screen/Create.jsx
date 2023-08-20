// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import { useSelector } from 'react-redux'; // Import useSelector from Redux
// import 'react-quill/dist/quill.snow.css'; // Import the CSS for the Quill editor style
// import '../css/profileScree.css'; // Import your custom CSS file
// import '../css/blogCreate.css';
// import axios from 'axios';

// const CreateBlog = () => {
//     const [title, setTitle] = useState('');
//     const [summary, setSummary] = useState('');
//     const [content, setContent] = useState('');
//     const [image, setImage] = useState(null);
  
//     // Access user info from the Redux store
//     const { userInfo } = useSelector((state) => state.auth);
  
//     const handleTitleChange = (event) => {
//       setTitle(event.target.value);
//     };
  
//     const handleSummaryChange = (event) => {
//       setSummary(event.target.value);
//     };
  
//     const handleContentChange = (value) => {
//       setContent(value);
//     };
  
//     const handleImageChange = (event) => {
//       setImage(event.target.files[0]);
//     };
  
//     const handlePostClick = async () => {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('summary', summary);
//       formData.append('content', content);
//       formData.append('image', image);
  
//       // Use the user ID from the Redux store
//       formData.append('author', userInfo._id);
  
//       try {
//         await axios.post('http://localhost:4000/api/users/blogs', formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//               Authorization: `Bearer ${userInfo.token}`, // Include the authentication token
//             },
//           });
//         // Handle success, show a success message or redirect
//       } catch (error) {
//         // Handle error, show an error message
//       }
//     };
  
//   return (
//     <div className="blog-form-container profile-container">
//       {/* Increase the gap by setting marginTop to 40px */}
//       <div className="blog-input-container" style={{ marginTop: '40px' }}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={handleTitleChange}
//           className="blog-input-field"
//         />
//         <input
//           type="text"
//           placeholder="Summary"
//           value={summary}
//           onChange={handleSummaryChange}
//           className="blog-input-field"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="blog-input-field"
//         />
//       </div>
//       <ReactQuill
//         value={content}
//         onChange={handleContentChange}
//         className="blog-quill-editor"
//       />
//       <button  onClick={handlePostClick} className="blog-post-button" style={{ marginTop: '6rem' , borderRadius:'10px'}}>
//         Create Tale
//       </button>
//     </div>
//   );
// };

// export default CreateBlog;


// import React, { useState , useEffect} from 'react';
// import ReactQuill from 'react-quill';
// import { useSelector } from 'react-redux'; // Import useSelector from Redux
// import 'react-quill/dist/quill.snow.css'; // Import the CSS for the Quill editor style
// import '../css/profileScree.css'; // Import your custom CSS file
// import '../css/blogCreate.css';
// import axios from 'axios';

// const CreateBlog = () => {
//     const [title, setTitle] = useState('');
//     const [summary, setSummary] = useState('');
//     const [content, setContent] = useState('');
//     const [image, setImage] = useState(null);
//     const [isSuccess, setIsSuccess] = useState(false); // State to track success
//     // Access user info from the Redux store
//     const { userInfo } = useSelector((state) => state.auth);
  
//     const handleTitleChange = (event) => {
//       setTitle(event.target.value);
//     };
  
//     const handleSummaryChange = (event) => {
//       setSummary(event.target.value);
//     };
  
//     const handleContentChange = (value) => {
//       setContent(value);
//     };
  
//     const handleImageChange = (event) => {
//       setImage(event.target.files[0]);
//     };
  

//     const handleSuccess = () => {
//         setTitle('');
//         setSummary('');
//         setContent('');
//         setImage(null);
//         setIsSuccess(true); // Set success state to show the message
//       };

//       useEffect(() => {
//         if (isSuccess) {
//           const timer = setTimeout(() => {
//             setIsSuccess(false); // Hide the success message after 3 seconds
//           }, 3000);
    
//           return () => {
//             clearTimeout(timer);
//           };
//         }
//       }, [isSuccess]);

//     const handlePostClick = async () => {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('summary', summary);
//       formData.append('content', content);
//       formData.append('image', image);
  
//       // Use the user ID from the Redux store
//       formData.append('author', userInfo._id);
  
//       try {
//         const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
//         await axios.post('http://localhost:4000/api/users/blogs', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`,
//       },
//       withCredentials: true, // Include cookies in the request
      
//     });
   
    
//      handleSuccess();
          
        
//       } catch (error) {
//         // Handle error, show an error message
//       }
//     };
  
//   return (
//     <div className="blog-form-container profile-container">
//       {/* Increase the gap by setting marginTop to 40px */}
//       <div className="blog-input-container" style={{ marginTop: '40px' }}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={handleTitleChange}
//           className="blog-input-field"
//         />
//         <input
//           type="text"
//           placeholder="Summary"
//           value={summary}
//           onChange={handleSummaryChange}
//           className="blog-input-field"
//         />
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="blog-input-field"
//         />
//       </div>
//       <ReactQuill
//         value={content}
//         onChange={handleContentChange}
//         className="blog-quill-editor"
       
//       />



//       <button
//         onClick={handlePostClick}
//         className="blog-post-button"
//         style={{ marginTop: '5rem', borderRadius: '10px' }}
//       >
//         Create Tale
//       </button>
//       {isSuccess && (
//         <p style={{ color: 'green', marginTop: '1rem' }}>
//           Blog created successfully! {/* Display a success message */}
//         </p>
//       )}
//     </div>
//   );
// };

// export default CreateBlog;  ORGINAL WORKING CODE



import React, { useState , useEffect} from 'react';
import ReactQuill from 'react-quill';
import { useSelector,useDispatch } from 'react-redux'; // Import useSelector from Redux
import 'react-quill/dist/quill.snow.css'; // Import the CSS for the Quill editor style
import '../css/profileScree.css'; // Import your custom CSS file
import '../css/blogCreate.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/UserApiSlice';
import { logout } from '../slices/AuthSlice';




const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false); // State to track success
    // Access user info from the Redux store
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [logoutApiCall] = useLogoutMutation();
    const navigate = useNavigate();







//check jwt
useEffect(() => {
  const checkAuth = async () => {
      try {
          const response = await fetch('http://localhost:4000/api/users/checkAuth', {
              credentials: 'include' // Include cookies in the request
          });
          if (!response.ok) {
              await logoutApiCall().unwrap();
              dispatch(logout());
              navigate('/landing');
          }
      } catch (error) {
          console.error('Check auth error:', error);
      }
  };

  if (userInfo) {
      checkAuth();
  }
}, [userInfo, dispatch, logoutApiCall, navigate]);







    


    useEffect(() => {
      const fetchUserStatus = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/users/status/${userInfo._id}`);
          const data = await response.json();
  
          if (data.status) {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/landing');
          }
        } catch (error) {
          console.error('Fetch user status error:', error);
        }
      };
  
      if (userInfo) {
        fetchUserStatus();
      }
    }, [userInfo, dispatch, logoutApiCall, navigate]);






    const handleTitleChange = (event) => {
      setTitle(event.target.value);
    };
  
    const handleSummaryChange = (event) => {
      setSummary(event.target.value);
    };
  
    const handleContentChange = (value) => {
      setContent(value);
    };
  
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
    };
  

    const handleSuccess = () => {
        setTitle('');
        setSummary('');
        setContent('');
        setImage(null);
        setIsSuccess(true); // Set success state to show the message
      };

      useEffect(() => {
        if (isSuccess) {
          const timer = setTimeout(() => {
            setIsSuccess(false); // Hide the success message after 3 seconds
          }, 3000);
    
          return () => {
            clearTimeout(timer);
          };
        }
      }, [isSuccess]);

    const handlePostClick = async () => {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('summary', summary);
      formData.append('content', content);
      formData.append('image', image);
  
      // Use the user ID from the Redux store
      formData.append('author', userInfo._id);
  
      try {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        await axios.post('http://localhost:4000/api/users/blogs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // Include cookies in the request
      
    });
   
    
     handleSuccess();
     navigate('/profile'); // Navigate to the /profile route
        
      } catch (error) {
        // Handle error, show an error message
      }
    };
  
  return (
    <div className="blog-form-container profile-container">
      {/* Increase the gap by setting marginTop to 40px */}
      <div className="blog-input-container" style={{ marginTop: '40px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
          className="blog-input-field"
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={handleSummaryChange}
          className="blog-input-field"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="blog-input-field"
        />
      </div>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        className="blog-quill-editor"
       
      />



      <button
        onClick={handlePostClick}
        className="blog-post-button"
        style={{ marginTop: '5rem', borderRadius: '10px' }}
      >
        Create Tale
      </button>
      {isSuccess && (
        <p style={{ color: 'green', marginTop: '1rem' }}>
          Blog created successfully! {/* Display a success message */}
        </p>
      )}
    </div>
  );
};

export default CreateBlog;
