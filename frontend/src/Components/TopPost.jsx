// import React, { useState } from 'react';
// import '../css/topPost.css'

// const [isCardVisible, setIsCardVisible] = useState(true);

// const TopPost = () => {



//     const toggleCard = () => {
//         setIsCardVisible(!isCardVisible);
//       };


//   return (
//     <div className='topPost'>
      
//       <button onClick={toggleCard}>Toggle Card</button>
//       {isCardVisible && (
//         <div className='card'>
//           <div className='image'></div>
//           <div className='description'>
//             <h3>Card Title</h3>
//             <p>This is a card description.</p>
//           </div>
//         </div>
//       )}


//     </div>
//   )
// }

// export default TopPost

import React, { useState } from 'react';
import '../css/topPost.css';

const TopPost = () => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div className='topPost'>
      <div className={`card-container ${isHovered ? 'paused' : ''}`}>
        <div className={`card ${isHovered ? 'paused' : ''}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          <div className='image'></div>
          <div className='description'>
            <h3>Card Title 1</h3>
            <p>This is a card description.</p>
          </div>
        </div>

        <div className={`card ${isHovered ? 'paused' : ''}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          <div className='image'></div>
          <div className='description'>
            <h3>Card Title 2</h3>
            <p>This is a card description.</p>
          </div>
        </div>

        <div className={`card ${isHovered ? 'paused' : ''}`} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>
          <div className='image'></div>
          <div className='description'>
            <h3>Card Title 3</h3>
            <p>This is a card description.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopPost;


