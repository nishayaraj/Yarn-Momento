import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getAllPublicStories } from '../../api';
import { deleteStory } from '../../api/storiesData';

function AllStories() {
  const { user: { uid } } = useAuth();
  const [stories, setStories] = useState([]);

  const deleteThisStory = (story) => {
    if (window.confirm(`Delete ${story.title}?`)) {
      deleteStory(story.firebaseKey).then(() => getAllPublicStories().then(setStories));
    }
  };

  useEffect(() => {
    getAllPublicStories()
      .then(setStories);
  }, []);

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
        <Card.Footer>
          <Link
            href={`/my-stories/${story.firebaseKey}`}
            passHref
          >
            <Button
              variant="primary"
              className="m-2"
            >
              VIEW
            </Button>
          </Link>
          {
          uid === story.uid
          && (
          <Link
            href={`/my-stories/edit/${story.firebaseKey}`}
            passHref
          >
            <Button
              variant="info"
            >
              EDIT
            </Button>

          </Link>
          )
        }
          {
          uid === story.uid
          && (
          <Button
            variant="danger"
            onClick={() => deleteThisStory(story)}
            className="m-2"
          >
            DELETE
          </Button>
          )
          }
        </Card.Footer>
      </Card>
    )) : 'No Public Story');

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
