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


import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { useSelector } from 'react-redux'; // Import useSelector from Redux
import 'react-quill/dist/quill.snow.css'; // Import the CSS for the Quill editor style
import '../css/profileScree.css'; // Import your custom CSS file
import '../css/blogCreate.css';
import axios from 'axios';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
  
    // Access user info from the Redux store
    const { userInfo } = useSelector((state) => state.auth);
  
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

          
        // Handle success, show a success message or redirect
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
      <button  onClick={handlePostClick} className="blog-post-button" style={{ marginTop: '6rem' , borderRadius:'10px'}}>
        Create Tale
      </button>
    </div>
  );
};

export default CreateBlog;
