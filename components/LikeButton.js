// import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function LikeButtonCounter() {
  const [likesCount, setLikesCount] = useState(0);
  // const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setLikesCount(likesCount + 1);
  };

  return (
    <div>
      <Button className="like_button" onClick={handleClick}> Like </Button>
      {likesCount}
      {/* <span className="likes-counter">{ `Like | ${likes}` }</span> */}
    </div>
  //  className={`like-button ${isClicked && 'liked'}`} onClick={handleClick}>
  //   <span className="likes-counter">{ `Like | ${likes}` }</span>

  );
}

export default LikeButtonCounter;
