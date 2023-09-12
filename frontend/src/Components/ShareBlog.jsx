import React from 'react'
import '../css/viewBlog.css'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const ShareBlog = ({ blogId, blogTitle }) => {


    const shareUrl = `https://ansaren.online/onlyView/${blogId}`; 
    const title = blogTitle;
    
  return (
    <div className='shareBlog'>
      <h5 style={{fontSize:"0.8rem",marginTop:"-1rem",color:"rgb(5, 80, 73)"}}>Share blog to other social app</h5>
<div className='shareButtons'>
     {/* Facebook Share Button */}
  <FacebookShareButton url={shareUrl} quote={title}>
    <FaFacebook /> 
  </FacebookShareButton>

  {/* Twitter Share Button */}
  <TwitterShareButton url={shareUrl} title={title}>
   <FaTwitter /> 
  </TwitterShareButton>

  {/* WhatsApp Share Button */}
  <WhatsappShareButton url={shareUrl} title={title}>
    <FaWhatsapp />
  </WhatsappShareButton>

  </div>


    </div>
  )
}

export default ShareBlog
