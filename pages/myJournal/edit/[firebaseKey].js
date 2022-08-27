import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import JournalForm from '../../../components/forms/JournalForm';
import { getSingleJournal } from '../../../api/journalData';

export default function EditJournal() {
  const [editJournal, setEditJournal] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleJournal(firebaseKey).then(setEditJournal);
  }, [firebaseKey]);

  return (<JournalForm obj={editJournal} />);
}
