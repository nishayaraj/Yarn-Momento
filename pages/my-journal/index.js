/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import AddJournalLink from '../../components/AddJournalLink';
import PageTitle from '../../components/PageTitle';
import { useAuth } from '../../utils/context/authContext';
import JournalCard from '../../components/JournalCard';
import { getMyJournals } from '../../api';

function MyJournals() {
  const [journals, setJournals] = useState([]);

  const { user } = useAuth();

  const getAllMyJournals = () => {
    getMyJournals(user.uid).then(setJournals);
  };

  useEffect(() => {
    getAllMyJournals();
  }, [user]);

  const renderJournal = () => journals.map((journal) => (
    <JournalCard
      key={journal.firebaseKey}
      journalObj={journal}
      onUpdate={getAllMyJournals}
    />
  ));

  return (
    <div className="text-center my-4">
      <PageTitle title="My journals" path="/my-journal">
        <AddJournalLink />
      </PageTitle>
      <div
        className="d-flex flex-wrap"
        style={{ justifyContent: 'center' }}
      >
        {renderJournal()}
      </div>
    </div>
  );
}

export default MyJournals;
