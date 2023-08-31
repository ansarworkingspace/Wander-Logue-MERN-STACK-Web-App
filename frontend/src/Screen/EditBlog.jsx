
// import '../css/editBlog.css';
// import ReactQuill from 'react-quill';




// const EditBlog = () => {



  
  
  
//       const handleTitleChange = (event) => {
       
//       };
    
//       const handleSummaryChange = (event) => {
        
//       };
    
//       const handleContentChange = (value) => {
       
//       };
    
//       const handleImageChange = (event) => {
       
//       };
    
  
//       const handleSuccess = () => {
  
//         };
  
    
//       const handlePostClick = async () => {
       
//       };
    


//   return (
//     <div className="editBlog-container">
//       <div className='headingeditBlog'>
//         <h4 className='titleOfeditBlog'>Your Can Edit This Blog </h4>
//       </div>
//       <div className='proLine'></div>




//       <div className="blog-input-container" style={{ marginTop: '40px' }}>
//         <input
//           type="text"
//           placeholder="Title"
//         //   value={title}
//           onChange={handleTitleChange}
//           className="blog-input-field"
//         />
//         <input
//           type="text"
//           placeholder="Summary"
//         //   value={summary}
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
//         // value={content}
//         onChange={handleContentChange}
//         className="blog-quill-editor"
       
//       />



//       <button
//         onClick={handlePostClick}
//         className="blog-post-button"
//         style={{ marginTop: '5rem', borderRadius: '10px' }}
//       >
//         Update Tale
//       </button>



      
//     </div>
//   );
// };

// export default EditBlog;




// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { Image } from 'react-bootstrap';
// import '../css/editBlog.css'



// const EditBlog = () => {
//   const { blogId } = useParams();
//   const [blogData, setBlogData] = useState({
//     title: '',
//     summary: '',
//     content: '',
//     images: [],
//   });

//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/users/getOneBlog/${blogId}`);
//         const fetchedBlogData = response.data;
//         setBlogData(fetchedBlogData);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchBlogData();
//   }, [blogId]);

//   const handleTitleChange = (event) => {
//     setBlogData((prevData) => ({ ...prevData, title: event.target.value }));
//   };

//   const handleSummaryChange = (event) => {
//     setBlogData((prevData) => ({ ...prevData, summary: event.target.value }));
//   };

//   const handleContentChange = (value) => {
//     setBlogData((prevData) => ({ ...prevData, content: value }));
//   };
//   const handleImageChange = (event) => {
//     const selectedImages = event.target.files;
//     setBlogData((prevData) => ({
//       ...prevData,
//       images: Array.from(selectedImages),
//     }));
//   };

//   const handleUpdateClick = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', blogData.title);
//       formData.append('summary', blogData.summary);
//       formData.append('content', blogData.content);
  
//       // Append each image file to the formData object
//       blogData.images.forEach((image, index) => {
//         formData.append('images', image); // Use 'images' as the field name
//       });
  
//       const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  
//       await axios.put(`http://localhost:4000/api/users/updateBlog/${blogId}`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true, // Include cookies in the request
//       });
  
//       // Handle success or display a success message
//     } catch (error) {
//       console.error(error);
//       // Handle error or display an error message
//     }
//   };
  
  

//   return (
//     <div className="blog-form-container profile-container">
//    <div className="blog-input-container" style={{ marginTop: '40px' }}>
//       <input
//         type="text"
//         placeholder="Title"
//         value={blogData.title}
//         onChange={handleTitleChange}
//         className="blog-input-field"
//       />
//       <input
//         type="text"
//         placeholder="Summary"
//         value={blogData.summary}
//         onChange={handleSummaryChange}
//         className="blog-input-field"
//       />
//         {blogData.images.length > 0 && (
//           <div className="editblog-image-container">
//             {blogData.images.map((image, index) => (
//               <Image
//               key={index}
//               src={`http://localhost:4000/api/users/${image}`} // Fetch the image from the backend
//               alt={`Image ${index + 1}`}
//               className="current-editblog-image"
//             />
//             ))}
//           </div>
//         )}
//            <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="blog-input-field"
//         />
//        </div>
//       <ReactQuill
//         value={blogData.content}
//         onChange={handleContentChange}
//         className="blog-quill-editor"
//       />
//       <button
//         onClick={handleUpdateClick}
//         className="blog-post-button"
//         style={{ marginTop: '5rem', borderRadius: '10px' }}
//       >
//         Update Tale
//       </button>
   
//     </div>
//   );
// };

// export default EditBlog;




import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../css/editBlog.css';
import {toast} from 'react-toastify'




const EditBlog = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState({
    title: '',
    summary: '',
    content: '',
  });

const navigate = useNavigate()


  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/users/getOneBlog/${blogId}`);
        const fetchedBlogData = response.data;
        setBlogData(fetchedBlogData);
      } catch (error) {
        toast.error("Getting Error fetching Blog Data");
      }
    };

    fetchBlogData();
  }, [blogId]);

  const handleTitleChange = (event) => {
    setBlogData((prevData) => ({ ...prevData, title: event.target.value }));
  };

  const handleSummaryChange = (event) => {
    setBlogData((prevData) => ({ ...prevData, summary: event.target.value }));
  };

  const handleContentChange = (value) => {
    setBlogData((prevData) => ({ ...prevData, content: value }));
  };

  const handleUpdateClick = async () => {
    try {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

      await axios.put(
        `http://localhost:4000/api/users/updateBlog/${blogId}`,
        {
          title: blogData.title,
          summary: blogData.summary,
          content: blogData.content,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      navigate('/profile')
    
    } catch (error) {
      toast.error("Error while updating");
      
    }
  };

  return (
    <div className="blog-form-container profile-container">
      <div className="blog-input-container" style={{ marginTop: '40px' }}>
        <input
          type="text"
          placeholder="Title"
          value={blogData.title}
          onChange={handleTitleChange}
          className="blog-input-field"
        />
        <input
          type="text"
          placeholder="Summary"
          value={blogData.summary}
          onChange={handleSummaryChange}
          className="blog-input-field"
        />
      </div>
      <ReactQuill
        value={blogData.content}
        onChange={handleContentChange}
        className="blog-quill-editor"
      />
      <button
        onClick={handleUpdateClick}
        className="blog-post-button"
        style={{ marginTop: '5rem', borderRadius: '10px' }}
      >
        Update Tale
      </button>
    </div>
  );
};

export default EditBlog;
