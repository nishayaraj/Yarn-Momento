/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

function AddStoryLink() {
  const router = useRouter();

  const routeToNewStoryPage = () => router.push('/my-stories/new');

  return (
    <Button
      variant="light"
      onClick={routeToNewStoryPage}
      style={{ background: 'white', height: '45px' }}
    >
      <img
        src="./plus.png"
        alt="Add new Story"
        style={{ height: '24px', marginRight: '6px' }}
      />
      New story
    </Button>
  );
}

export default AddStoryLink;
