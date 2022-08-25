/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Card from 'react-bootstrap/Card';
import { getSingleStory } from '../../api/storiesData';

export default function ViewStoryCards() {
  const [storyDetails, setStoryDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleStory(firebaseKey).then(setStoryDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <Card className="text-center">
        {/* check this later */}
        <Card.Body>
          <Card.Title>{storyDetails.title}</Card.Title>
          <Card.Text>
            {storyDetails.story}
            <br />
            Author:  {storyDetails.authorName}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Date Created: {storyDetails.date}</Card.Footer>
      </Card>
      <div className="text-dark ms-5 details">
        <h6>
          {storyDetails.public ? ' Public Story' : 'Private Story'}
          <br />
          Published Status: {storyDetails.isPublished ? ' Published' : 'In Progress'}
        </h6>
      </div>
    </div>
  );
}
