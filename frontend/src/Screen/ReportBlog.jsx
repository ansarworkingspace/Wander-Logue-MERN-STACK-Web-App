


import React, { useState } from 'react';
import '../css/profileScree.css';
import '../css/blogCreate.css';
import axios from 'axios'; // Import axios
import { Link, useParams, useNavigate } from 'react-router-dom'; // Import useParams
import { toast } from 'react-toastify';

const ReportBlog = () => {
  const [selectedReason, setSelectedReason] = useState('');
  const { blogId } = useParams(); // Use useParams to get the blogId from the URL
  const navigate = useNavigate();

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };


const handleSubmit = async () => {

    if (!selectedReason) {
        toast.error('Please select a reason');
        return;
      }

    if (selectedReason) {
      try {
        const response = await axios.post(
          `https://ansaren.online/api/users/reportBlog/${blogId}`,
          {
            reason: selectedReason,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          toast.success('Blog reported successfully');
          navigate(`/allBlogs/${blogId}`); // Redirect to homepage or wherever you want
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          toast.error('You have already reported this blog');
          navigate(`/allBlogs/${blogId}`); 
        } else {
          toast.error('Error reporting blog');
        }
        // console.error('Error reporting blog:', error);
      }
    }
  };


  return (
    <div className="blog-form-container profile-container">
      <div className="blog-input-container" style={{ marginTop: '9rem' }}>
        <label style={{ color: "white", fontFamily: "Sora", fontSize: "0.8rem" }} htmlFor="reason">Select Reason:</label>
        <select className='blog-input-field'
          id="reason"
          name="reason"
          value={selectedReason}
          onChange={handleReasonChange}
        >
          <option value="">Select a reason</option>
          <option value="spam">Spam</option>
          <option value="inappropriate">Inappropriate Content</option>
          <option value="other">Other</option>
        </select>
      </div>

      <button
        className="blog-post-button"
        style={{ marginTop: '5rem', borderRadius: '10px', marginRight: "0.5rem" }}
        onClick={handleSubmit}
      >
        Submit Report
      </button>
    </div>
  );
};

export default ReportBlog;
