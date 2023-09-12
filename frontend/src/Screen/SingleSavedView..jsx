
import axios from 'axios';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react'; // Import the useState and useEffect hooks
import { Image } from 'react-bootstrap';
import { FaThumbsUp, FaBookmark, FaComment } from 'react-icons/fa'; 
import '../css/viewBlog.css';

const SingleSavedView = () => {
  const { blogId } = useParams();
  const [selectedBlog, setSelectedBlog] = useState(null);



  useEffect(() => {
    fetch(`https://ansaren.online/api/users/getSavedSingleBlog/${blogId}`)
      .then((response) => response.json())
      .then((data) => setSelectedBlog(data))
      .catch((error) => console.error(error));
  }, [blogId]);

  if (!selectedBlog) {
    return <p>Loading...</p>;
  }


  function getFileExtension(filename) {
    return filename.split('.').pop();
  }



  const secondImageOrVideoExists = selectedBlog.images.length > 1;


  return (
    <div className="viewBlog-container">

      <div className='titleView'>
      <h2>{selectedBlog.title}</h2>
      </div>

      <div className='blogDetails'>
      <p>Author: {selectedBlog.author.name}</p>
      <p>Created on: {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
      </div>


      <div className='proLine'></div>

      <div className='actionDetails'>
      <div className="iconWrapper">
          <FaThumbsUp />
        </div>
        
        <div className="iconWrapper">
          <FaComment />
        </div>
      </div>

      <div className='proLine'></div>

      <div className='imageView'>
        {selectedBlog.images.length > 0 && (
        // <Image
        //   src={`https://ansaren.online/api/users/${selectedBlog.images[0]}`}
        //   alt='Blog'
        //   className='viewImageOndiv'
        // />



        getFileExtension(selectedBlog.images[0]) === 'mp4' ? (
          <video
            src={`https://ansaren.online/api/users/${selectedBlog.images[0]}`}
            controls
            className='viewImageOndiv'
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={`https://ansaren.online/api/users/${selectedBlog.images[0]}`}
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
              src={`https://ansaren.online/api/users/${selectedBlog.images[1]}`}
              controls
              className='viewImageOndiv'
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={`https://ansaren.online/api/users/${selectedBlog.images[1]}`}
              alt='Blog'
              className='viewImageOndiv'
            />
          )}
        </div>
      )}

      {!secondImageOrVideoExists && <div className='proLine'></div>}


      <div className='contentView' dangerouslySetInnerHTML={{ __html: selectedBlog.content }} />
      
      
     
      
     
    </div>
  );
};

export default SingleSavedView ;
