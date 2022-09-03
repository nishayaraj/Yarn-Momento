import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getAllPublicStories, updateUserStoryLike, getUserProfileData } from '../../api';
import { deleteStory } from '../../api/storiesData';
import LikeComponent from '../../components/LikeComponent';

function AllStories() {
  const { user: { uid } } = useAuth();
  const [stories, setStories] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getAllPublicStories()
      .then(setStories);
  }, []);

  useEffect(() => {
    if (uid) {
      getUserProfileData(uid)
        .then((data) => {
          setUserData(data);
        });
    }
  }, [uid]);

  const deleteThisStory = (story) => {
    if (window.confirm(`Delete ${story.title}?`)) {
      deleteStory(story.firebaseKey).then(() => getAllPublicStories().then(setStories));
    }
  };

  const makeUserProfileLikeObj = (storyFirebaseKey, like) => {
    let userLikedStories = userData?.likedStories;

    if (userLikedStories) {
      if (like === true && !(userLikedStories.includes(storyFirebaseKey))) {
        userLikedStories = [...userLikedStories, storyFirebaseKey];
      } else if (like === false && userLikedStories.includes(storyFirebaseKey)) {
        const index = userLikedStories.indexOf(storyFirebaseKey);
        if (index > -1) {
          userLikedStories.splice(index, 1);
        }
      }
    } else if (like === true) {
      userLikedStories = [storyFirebaseKey];
    }
    return { ...userData, likedStories: userLikedStories };
  };

  const updateStoryLikes = (storyObj, like) => {
    let updatedStoryObj = { ...storyObj };
    const updateUserObj = makeUserProfileLikeObj(storyObj.firebaseKey, like);
    if (like) {
      updatedStoryObj = { ...updatedStoryObj, likes: (storyObj.likes || 0) + 1 };
    } else {
      const currentLike = storyObj.likes || 0;
      updatedStoryObj = { ...updatedStoryObj, likes: (currentLike > 0) ? currentLike - 1 : 0 };
    }
    updateUserStoryLike(updatedStoryObj, updateUserObj);
  };

  const renderStories = () => ((stories && stories.length > 0)
    ? stories.map((story) => {
      const userLikedStories = userData?.likedStories || [];
      const isUserLikedStory = userLikedStories.includes(story.firebaseKey);

      return (
        <Card
          key={story.firebaseKey}
          style={{
            width: '400px',
            margin: '15px',
            padding: '10px',
            borderRadius: '8px',
          }}
        >
          <Card.Title>
            {story.title}
          </Card.Title>
          <Card.Subtitle>
            Author: {story.authorName}
          </Card.Subtitle>
          <Card.Body>
            {story.story}
          </Card.Body>
          <Card.Footer>
            <Link href={`/my-stories/${story.firebaseKey}`} passHref><Button variant="primary" className="m-2">VIEW</Button></Link>
            {uid === story.uid && (<Link href={`/my-stories/edit/${story.firebaseKey}`} passHref><Button variant="info">EDIT</Button></Link>)}
            {uid === story.uid && (<Button variant="danger" onClick={() => deleteThisStory(story)} className="m-2">DELETE</Button>)}
            <LikeComponent
              userLiked={isUserLikedStory}
              counter={story.likes || 0}
              updateLikeCounter={(like) => updateStoryLikes(story, like)}
            />
          </Card.Footer>
        </Card>
      );
    }) : 'No Public Story');

  return (
    <div>
      <h1>All Stories</h1>
      <div
        style={{
          display: 'flex',
          margin: '30px',
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}
      >
        {renderStories()}
      </div>
    </div>
  );
}

export default AllStories;
