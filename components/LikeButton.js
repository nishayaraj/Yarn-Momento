/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export default function LikeButton({ disableLikeOption }) {
  const [liked, setLiked] = useState(false);

  const updateLikeOption = () => {
    setLiked(!liked);
  };

  return (
    <div>
      {
        disableLikeOption && (
        <Button
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            margin: 0,
          }}
          onClick={updateLikeOption}
        >
          {
            liked
              ? <AiFillHeart color="red" fontSize="25px" />
              : <AiOutlineHeart color="gray" fontSize="25px" />
          }
        </Button>
        )
      }
      <div>1000 Likes</div>
    </div>
  );
}

LikeButton.propTypes = {
  disableLikeOption: PropTypes.bool,
};

LikeButton.defaultProps = {
  disableLikeOption: true,
};
