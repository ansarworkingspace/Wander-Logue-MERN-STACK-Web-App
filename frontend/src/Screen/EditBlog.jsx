

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
        const response = await axios.get(`https://ansaren.online/api/users/getOneBlog/${blogId}`);
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
        `https://ansaren.online/api/users/updateBlog/${blogId}`,
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
