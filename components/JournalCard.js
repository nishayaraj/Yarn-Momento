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
    <Card
      className="bg-dark text-black"
      key={journalObj.firebaseKey}
      style={{ borderColor: 'lightgray' }}
    >
      <Card.Img
        src={journalObj.imageUrl}
        alt={journalObj.journalType}
        style={{ height: '300px', width: '300px', objectFit: 'cover' }}
      />

      <Card.ImgOverlay
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Card.Title>
          {journalObj.journalType}
        </Card.Title>
        <Card.Body>
          Created On:{journalObj.date}
        </Card.Body>
        <Card.Footer fixed="bottom">
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
        </Card.Footer>
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
