import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteStory } from '../api/storiesData';

function StoryCard({ storyObj, onUpdate }) {
  const deleteThisStory = () => {
    if (window.confirm(`Delete ${storyObj.title}?`)) {
      deleteStory(storyObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="text-center">
      {/* check this later */}
      <Card.Header>{storyObj.title}</Card.Header>
      <Card.Body>
        <Card.Text>
          {storyObj.story}
        </Card.Text>

        <p>By: {storyObj.authorName}</p>
        <Link href={`/myStories/${storyObj.firebaseKey}`} passHref>
          <Button
            variant="primary"
            className="m-2"
          >
            VIEW
          </Button>
        </Link>

        <Link href={`/myStories/edit/${storyObj.firebaseKey}`} passHref>
          <Button
            variant="info"
          >
            EDIT
          </Button>
        </Link>

        <Button variant="danger" onClick={deleteThisStory} className="m-2">
          DELETE
        </Button>

      </Card.Body>
      <Card.Footer className="text-muted">Date Created: {storyObj.date}</Card.Footer>
    </Card>
  );
}

StoryCard.propTypes = {
  storyObj: PropTypes.shape({
    authorName: PropTypes.string,
    title: PropTypes.string,
    story: PropTypes.string,
    public: PropTypes.bool,
    date: PropTypes.string,
    journalId: PropTypes.string,
    isPublished: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StoryCard;
