/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

function AddJournalLink() {
  const router = useRouter();
  const routeToNewJournalPage = () => router.push('/my-journal/new');

  return (
    <Button
      variant="primary"
      onClick={routeToNewJournalPage}
    >
      Add new Journal
    </Button>
  );
}

export default AddJournalLink;
