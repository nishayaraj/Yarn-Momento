/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

function AddJournalLink() {
  const router = useRouter();
  const routeToNewJournalPage = () => router.push('/my-journal/new');

  return (
    <Button
      variant="light"
      onClick={routeToNewJournalPage}
      style={{ background: 'white', height: '45px' }}
    >
      <img
        src="./plus.png"
        alt="Add new journal"
        style={{ height: '24px', marginRight: '6px' }}
      />
      New journal
    </Button>
  );
}

export default AddJournalLink;
