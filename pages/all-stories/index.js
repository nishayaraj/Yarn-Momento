import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { getAllPublicStories } from '../../api';

function Landing() {
  const [stories, setStories] = useState([]);
  // const [searchStoryTitle, setSearchStoryTitle] = useState('');

  useEffect(() => {
    getAllPublicStories()
      .then(setStories);
  }, []);

  const renderStories = () => ((stories && stories.length > 0)
    ? stories.map((story) => {
      if (story.title === 'The Little Thief in the Pantry') {
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
          </Card>
        );
      }
      return '';
    }) : 'No Public Story');

  return (
    <div>
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
