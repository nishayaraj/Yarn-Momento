/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

function AddStoryLink() {
  const router = useRouter();

  const routeToNewStoryPage = () => router.push('/my-stories/new');

  return (
    <Button
      variant="primary"
      onClick={routeToNewStoryPage}
    >
      Add new story
    </Button>
  );
}

export default AddStoryLink;
