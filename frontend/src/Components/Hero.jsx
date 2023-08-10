import { Container, Card, Button } from 'react-bootstrap';
import { FaSearch,FaEye, FaTrash, FaEdit } from 'react-icons/fa'; // Importing the FaSearch icon from react-icons
import '../css/landingAFL.css';

const Hero = () => {
  return (
    <div className="landing-container">
      <div className="topHome">
        <h3>Latest Tales</h3>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button><FaSearch /></button>
        </div>
      </div>
      <div className='proLine'></div>

<div className='allPostLanding'>
     <div className='eachPost'>
     <div className='postImage'>
      </div>
     <div className='postContentLanding'>

     
              <button className='iconInPostContentLanding'><FaEye /></button>
           
     </div>
     </div>
     <div className='proLine'></div>



     <div className='eachPost'>
     <div className='postImage'>
      </div>
     <div className='postContentLanding'>
     <button className='iconInPostContentLanding'><FaEye /></button>
     </div>
     </div>
     <div className='proLine'></div>



     <div className='eachPost'>
     <div className='postImage'>
      </div>
     <div className='postContentLanding'>
     <button className='iconInPostContentLanding'><FaEye /></button>
     </div>
     </div>
     <div className='proLine'></div>



</div>





    </div>
  );
};

export default Hero;
