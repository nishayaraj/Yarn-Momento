/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useRouter } from 'next/router';

function AddJournalLink() {
  const router = useRouter();
  const routeToNewJournalPage = () => router.push('/my-journal/new');

  return (
    <div
      variant="light"
      onClick={routeToNewJournalPage}
      className="addButton"
    >
      <img
        src="/addJournal.png"
        alt="Add new journal"
        style={{
          height: '25px',
          objectFit: 'contain',
          marginRight: '6px',
        }}
      />
      <span
        style={{
          fontSize: '14px',
        }}
      >
        Add Journal
      </span>
    </div>
  );
}

export default AddJournalLink;
