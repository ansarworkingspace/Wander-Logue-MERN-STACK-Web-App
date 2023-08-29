import { FaSearch } from 'react-icons/fa';
import '../css/profileScree.css'; // Import the CSS file
import '../css/chatRoom.css';
import { Button, Image } from 'react-bootstrap';// Import React Bootstrap components
import ChatComponent from '../Components/ChatComponent';




const AllFollowing = () => {
  


  return (
    <div className="chatRoom-container" >
   <div className="topHomeLanding">
        <h3 style={{fontFamily:"phudu",fontSize:"0.8rem"}}>Chat Room</h3>
        <div className="search-bar-l">
          <input
            type="text"
            placeholder="Search"
            // value={searchQuery}
            // onChange={handleSearch}
          />
          <button><FaSearch /></button>
        </div>
      </div>
<div className='fullChatDiv'>
      <div className='chatHistoryContainer'  style={{ maxHeight: "400px", overflowY: "scroll" }}>
       
            <div className='followingBox' style={{width:"95%"}} >
              <div className='imageONbox'>
              
                  <Image  alt="Profile" className="followingImage" roundedCircle />
              
              </div>
              <div className='nameOfFollowingUser'>
                ansar
              </div>
              <div className='unfollowBtn' style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginLeft:"1rem",paddingRight:"1rem",height:"2.5rem"}}>
              {/* <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none"}}  >Profile </Button> */}
                <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none",width:"6rem"}}  >Chat </Button>
              </div>
            </div>
            <div className='followingBox' style={{width:"95%"}} >
              <div className='imageONbox'>
              
                  <Image  alt="Profile" className="followingImage" roundedCircle />
              
              </div>
              <div className='nameOfFollowingUser'>
                ansar
              </div>
              <div className='unfollowBtn' style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginLeft:"1rem",paddingRight:"1rem",height:"2.5rem"}}>
              {/* <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none"}}  >Profile </Button> */}
                <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none",width:"6rem"}}  >Chat </Button>
              </div>
            </div>
            <div className='followingBox' style={{width:"95%"}} >
              <div className='imageONbox'>
              
                  <Image  alt="Profile" className="followingImage" roundedCircle />
              
              </div>
              <div className='nameOfFollowingUser'>
                ansar
              </div>
              <div className='unfollowBtn' style={{display:"flex",flexDirection:"row",justifyContent:"space-between",marginLeft:"1rem",paddingRight:"1rem",height:"2.5rem"}}>
              {/* <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none"}}  >Profile </Button> */}
                <Button variant="danger" className="unfollow-button" style={{backgroundColor:"#7EAA92",border:"none",width:"6rem"}}  >Chat </Button>
              </div>
            </div>
      
      </div>
     

{/* chat page component */}
{/* <ChatComponent/> */}
{/* chat page component */}
      
      </div>



    </div>
    
  );
  

  
};

export default AllFollowing;