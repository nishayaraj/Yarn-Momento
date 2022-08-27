import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';
import LoggedOutNavBar from './LoggedOutNavBar';
import { anonymouslySignIn } from '../utils/auth';
import { getAllPublicStories } from '../api';

function Landing() {
  const { anonymousUser } = useAuth();
  const [stories, setStories] = useState([]);

  useEffect(() => {
    anonymouslySignIn();
  }, []);

  useEffect(() => {
    if (anonymousUser) {
      getAllPublicStories()
        .then(setStories);
    }
  }, [anonymousUser]);

  const renderStories = () => ((stories && stories.length > 0)
    ? stories.map((story) => (
      <Card
        key={story.firebaseKey}
        style={{
          width: '400px',
          margin: '15px',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <Card.Title>{story.title}</Card.Title>
        <Card.Subtitle>Author: {story.authorName}</Card.Subtitle>
        <Card.Body>{story.story}</Card.Body>
      </Card>
    )) : 'no public story');

  return (
    <div>
      <LoggedOutNavBar />
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

export default Landing;
