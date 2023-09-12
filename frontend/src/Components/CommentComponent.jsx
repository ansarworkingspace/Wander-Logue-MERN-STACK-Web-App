// import React, { useState } from 'react';
// import '../css/viewBlog.css'
// import axios from 'axios';




// const CommentComponent = ({ blogId }) => {

//     const [commentText, setCommentText] = useState('');

//     const handleCommentSubmit = async () => {
//         if (commentText.trim() === '') {
//           return; // Prevent empty comments
//         }
    
//         try {
//           await axios.post(`https://ansaren.online/api/users/postComment/${blogId}`, {
//             text: commentText
//           }, {
//             withCredentials: true
//           });
    
//           // Clear input field after successful submission
//           setCommentText('');
//           // You can add a success message or update the comment list here
//         } catch (error) {
//           console.error('Error submitting comment:', error);
//         }
//       };

//   return (
//     <div className='commentBox'>
//       <div className="topHomeLanding" style={{ width: "86%", marginLeft: "3rem" }}>
//         <h3>Comment Section</h3>
//       </div>
//       <div className='inputCover'>
//         <input
//           type="text"
//           placeholder='Type Your Comment'
//           className='blog-input-field'
//           style={{ border: "none", marginLeft: "8rem", marginTop: "2rem", width: "60%" }}
//           value={commentText}
//           onChange={e => setCommentText(e.target.value)}
//         />
//         <button  type="button" className='buttonReportBox' style={{ height: "2rem", marginTop: "2.2rem" }}   onClick={handleCommentSubmit}>Submit</button>
//       </div>
//       <div className='proLine'></div>
//       <div className='commentContainer' style={{ maxHeight: "400px", overflowY: "scroll" }}>
//         <div className='commentArea'>
//           <div className='userName' style={{paddingTop:"0.4rem"}}>
//             <h4 className='commentH4' >Ansar</h4>
//           </div>
      
//           <div className='commentText'>
//             <h3 className='commentH3'>wow Nice Post man</h3>
//           </div>
//           <div className='commentTime' style={{paddingBottom:"0.1rem"}}>
//             <h5 className='commentH5'>4.20pm</h5>
//           </div>
//         </div>
       
//       </div>
//     </div>
//   );
// };

// export default CommentComponent;



import React, { useState,useEffect } from 'react';
import '../css/viewBlog.css'
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';



const CommentComponent = ({ blogId }) => {

    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);



    useEffect(() => {
        fetchComments();
      }, []);
    
      const fetchComments = async () => {
        try {
          const response = await axios.get(`https://ansaren.online/api/users/getComments/${blogId}`,

          { withCredentials: true
        });




          
          setComments(response.data.comments);
        } catch (error) {
          console.error('Error fetching comments:', error);
        }
      };





    const handleCommentSubmit = async () => {
        if (commentText.trim() === '') {
          return; // Prevent empty comments
        }
    
        try {
          await axios.post(`https://ansaren.online/api/users/postComment/${blogId}`, {
            text: commentText
          }, {
            withCredentials: true
          });
    
          // Clear input field after successful submission
          setCommentText('');


          fetchComments();
          // You can add a success message or update the comment list here
        } catch (error) {
          console.error('Error submitting comment:', error);
        }
      };

  return (
    <div className='commentBox'>
      <div className="topHomeLanding" style={{ width: "86%", marginLeft: "3rem",backgroundColor:"#7EAA92" }}>
        <h3 style={{color:"rgb(5, 80, 73)"}}>Comment Section</h3>
      </div>
      <div className='inputCover'>
        <input
          type="text"
          placeholder='Type Your Comment'
          className='blog-input-field'
          style={{ border: "none", marginLeft: "8rem", marginTop: "2rem", width: "60%" }}
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
        />
        <button  type="button" className='buttonReportBox' style={{ height: "2rem", marginTop: "2.2rem",backgroundColor:"#C8E4B2",color:"rgb(5, 80, 73)" }}   onClick={handleCommentSubmit}>Submit</button>
      </div>
      <div className='proLine'></div>
      <div className='commentContainer' style={{ maxHeight: "400px", overflowY: "scroll" }}>
        {comments.map((comment) => (
          <div className='commentArea' key={comment._id}>
            <div className='userName' style={{ paddingTop: "0.4rem" }}>
              <h4 className='commentH4'>{comment.user.name}</h4>
            </div>
            <div className='commentText'>
              <h3 className='commentH3'>{comment.content}</h3>
            </div>
            <div className='commentTime' style={{ paddingBottom: "0.1rem" }}>
              {/* <h5 className='commentH5'>{comment.createdAt}</h5> */}
              <h5 className='commentH5'>{formatDistanceToNow(new Date(comment.createdAt))} ago</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentComponent;
