import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the CSS for the Quill editor style
import '../css/profileScree.css'; // Import your custom CSS file
import '../css/blogCreate.css';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

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
    // Handle image upload logic here
    // For example, set the image URL to the 'image' state
    // setImage(event.target.value);
  };

  const handlePostClick = () => {
    // Handle the blog post logic here
    // You can send the data (title, summary, content, image) to your API
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
      <button onClick={handlePostClick} className="blog-post-button" style={{ marginTop: '6rem' , borderRadius:'10px'}}>
        Create Tale
      </button>
    </div>
  );
};

export default CreateBlog;
