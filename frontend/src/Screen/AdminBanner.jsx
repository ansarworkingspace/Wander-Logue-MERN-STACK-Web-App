import { FaSearch } from 'react-icons/fa';
import '../css/adminBanner.css';
import { Button, Image } from 'react-bootstrap';
import { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



const BannerContainer = () => {
const [banner, setBanner] = useState(null);
  const [hasError, setHasError] = useState(false);
  const fileInputRef = useRef(null);



  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/banners');
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
      }
    };

    fetchBanners();
  }, []);



  const handleBannerChange = (event) => {
    setBanner(event.target.files[0]);
  };


  const handleBannerUpload = async () => {
    

    if (!banner || !['image/jpeg', 'video/mp4'].includes(banner.type)) {
      setHasError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('media', banner);

      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      
      await axios.post('http://localhost:4000/api/admin/uploadBanner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      toast.success('Banner uploaded successfully.');
      setBanner(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Reset the file input
      }
    } catch (error) {
      toast.error('Error uploading banner.');
    }
  };



  useEffect(() => {
    if (hasError) {
      toast.error('Please add JPG or MP4 files.');

      setBanner(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Reset the file input
      }
      setHasError(false); // Reset the hasError state
    }
  }, [hasError]);





  return (
    <div className="banner-container">
     <div className="topHomeLanding">
        <h3>Banner</h3>
      
      </div>


<div className='bannerInputBox'>
    <div className='textBanner'>
        <h4 className='bannerH'>You Can Add Banner</h4>
    </div>
    <div className="inputbanner">
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleBannerChange}
          className="blog-input-field"
          ref={fileInputRef}
        />
      </div>
      <button
        onClick={handleBannerUpload}
        className="blog-post-button"
        style={{ marginTop: '2rem', borderRadius: '10px' }}
      >
        Upload Banner
      </button>
 
</div>

    
<div className='proLine'></div>

<div className="topHomeLanding">
        <h3>Banner Manager</h3>
      
      </div>




      <div className='BmanagerContainer'>
       

          
      {banners.map((banner, index) => (
          <div className='bannerBox' key={index}>
            <div className='videoONbox'>
            <video style={{borderRadius:"1rem"}}
          src={`http://localhost:4000/api/users/${banner.media}`}
            controls
            className='viewImageOndiv'
          >
            Your browser does not support the video tag.
          </video>
            </div>
            <div className='nameOfBanner'></div>
            
            <div className='bannerUse'>
              <Button variant="primary" className="unfollow-button">Select</Button>
            </div>
            <div className='bannerDel'>
              <Button variant="danger" className="unfollow-button">Delete</Button>
            </div>
         
          </div>
          
        ))}
         
      
      </div>



    </div>
  );
};

export default BannerContainer;