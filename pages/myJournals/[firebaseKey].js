/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewJournalDetails } from '../../api/mergedData';
import StoryCard from '../../components/StoryCard';

export default function ViewJournal() {
  const [journalDetails, setJournalDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewJournalDetails(firebaseKey).then(setJournalDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-dark ms-5 details">
        <h5>
          {journalDetails.journalType}
        </h5>
        <div className="stories-cards-container">
          {journalDetails.myStories?.map((story) => (
            <StoryCard
              key={story.firebaseKey}
              storyObj={story}
              onUpdate={() => {
                viewJournalDetails(firebaseKey).then(setJournalDetails);
              }}
            />
          ))}
        </div>
        <hr />
      </div>
    </div>
  );
}
