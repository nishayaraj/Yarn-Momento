/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export default function LikeComponent({
  userLiked, disableLikeOption, counter, updateLikeCounter,
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    setLiked(userLiked);
    setLikeCount(counter);
  }, [userLiked, disableLikeOption, counter]);

  const updateLikeOption = (isLiked) => {
    if (isLiked === true) {
      setLikeCount(likeCount ? likeCount + 1 : 1);
    } else if (isLiked === false && likeCount) {
      setLikeCount(likeCount - 1);
    }

    if (updateLikeCounter) {
      updateLikeCounter(isLiked);
    }
    setLiked(isLiked);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {
        !disableLikeOption && (
        <Button
          style={{
            border: 'none',
            background: 'none',
            padding: 0,
            margin: 0,
          }}
          onClick={() => updateLikeOption(!liked)}
        >
          {
            liked
              ? <AiFillHeart color="red" fontSize="25px" />
              : <AiOutlineHeart color="gray" fontSize="25px" />
          }
        </Button>
        )
      }
      {
        !!likeCount
          && <div style={{ marginLeft: '6px' }}>{likeCount} Likes</div>
      }
    </div>
  );
}

LikeComponent.propTypes = {
  updateLikeCounter: PropTypes.func,
  disableLikeOption: PropTypes.bool,
  counter: PropTypes.number,
  userLiked: PropTypes.bool,
};

LikeComponent.defaultProps = {
  disableLikeOption: false,
  userLiked: false,
  counter: 0,
  updateLikeCounter: () => {},
};
