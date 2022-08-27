/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewJournalDetails } from '../../api';
import StoryCard from '../../components/StoryCard';

export default function ViewJournal() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  const [journalDetails, setJournalDetails] = useState({});

  useEffect(() => {
    viewJournalDetails(firebaseKey)
      .then(setJournalDetails);
  }, [firebaseKey]);

  const renderStories = () => ((journalDetails && journalDetails?.stories && journalDetails.stories.length > 0)
    ? journalDetails?.stories?.map((story) => (
      <StoryCard
        key={story.firebaseKey}
        storyObj={story}
        onUpdate={() => {
          viewJournalDetails(firebaseKey).then(setJournalDetails);
        }}
      />
    )) : 'no stories found');

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="text-dark ms-5 details">
        <h5>
          Journal of {journalDetails?.journal?.journalType}
        </h5>
        <div className="stories-cards-container">
          {renderStories()}
        </div>
        <hr />
      </div>
    </div>
  );
}
