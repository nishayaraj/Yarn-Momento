import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../utils/context/authContext';
import LoggedOutNavBar from './LoggedOutNavBar';
import { anonymouslySignIn } from '../utils/auth';
import { getAllPublicStories } from '../api';
import LikeComponent from './LikeComponent';

function Landing() {
  const { anonymousUser } = useAuth();
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState(undefined);

  useEffect(() => {
    anonymouslySignIn();
  }, []);

  useEffect(() => {
    if (anonymousUser) {
      getAllPublicStories()
        .then(setStories);
    }
  }, [anonymousUser]);

  // takes care of rendering stories with & without search filter:
  const renderStories = () => ((stories && stories.length > 0)
    ? stories.map((story) => {
      if (search && story.title.toLowerCase().toLowerCase().includes(search.toLowerCase())) {
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
            <Card.Title>{story.title}</Card.Title>
            <Card.Subtitle>Author: {story.authorName}</Card.Subtitle>
            <Card.Body>{story.story}</Card.Body>
            <LikeComponent disableLikeOption counter={story.likes} />
          </Card>
        );
      }
      if (!search) {
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
            <Card.Title>{story.title}</Card.Title>
            <Card.Subtitle>Author: {story.authorName}</Card.Subtitle>
            {story.journalType && <Card.Subtitle>Genre: {story.journalType}</Card.Subtitle>}
            <Card.Body>{story.story}</Card.Body>
            <LikeComponent disableLikeOption counter={story.likes} />
          </Card>
        );
      }
      return '';
    }) : 'no public story');

  return (
    <div>
      <LoggedOutNavBar getSearchTerm={setSearch} />
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
