import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteJournalAndStories } from '../api';

function JournalCard({ journalObj, onUpdate }) {
  const deleteThisJournal = () => {
    if (window.confirm(`Delete ${journalObj.journalType}?`)) {
      deleteJournalAndStories(journalObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="bg-dark text-black">
      <Card.Img
        src={journalObj.imageUrl}
        alt={journalObj.journalType}
        style={{ height: '400px', width: '300px' }}
      />

      <Card.ImgOverlay>
        <Card.Title>
          {journalObj.journalType}
        </Card.Title>

        <p className="card-text bold">
          Created On:{journalObj.date}
        </p>

        <Link
          href={`/my-journal/${journalObj.firebaseKey}`}
          passHref
        >
          <Button
            variant="primary"
            className="m-2"
          >
            VIEW
          </Button>
        </Link>

        <Link href={`/my-journal/edit/${journalObj.firebaseKey}`} passHref>
          <Button
            variant="info"
          >
            EDIT
          </Button>
        </Link>

        <Button
          variant="danger"
          onClick={deleteThisJournal}
          className="m-2"
        >
          DELETE
        </Button>

      </Card.ImgOverlay>
    </Card>
  );
}

JournalCard.propTypes = {
  journalObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    journalType: PropTypes.string,
    date: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default JournalCard;
