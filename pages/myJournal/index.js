/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AddJournalLink from '../../components/AddJournalLink';
import { useAuth } from '../../utils/context/authContext';
import JournalCard from '../../components/JournalCard';
import { getMyJournals } from '../../api/journalData';

function MyJournals() {
  const [journals, setJournals] = useState([]);

  const { user } = useAuth();

  const getAllMyJournals = () => {
    getMyJournals(user.uid).then(setJournals);
  };

  useEffect(() => {
    getAllMyJournals();
  }, [user]);

  return (
    <div className="text-center my-4">
      <Link
        href="/myJournal"
        passHref
      >
        <h1>My Journals</h1>
      </Link>

      <div className="d-flex flex-wrap">
        {journals.map((journal) => {
          console.log(journal);
          return (
            <JournalCard
              key={journal.firebaseKey}
              journalObj={journal}
              onUpdate={getAllMyJournals}
            />
          );
        })}
      </div>
      <div style={{ margin: '20px' }}>
        <AddJournalLink />
      </div>
    </div>
  );
}

export default MyJournals;
