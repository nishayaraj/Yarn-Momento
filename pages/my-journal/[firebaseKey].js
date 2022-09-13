/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewJournalDetails } from '../../api';
import PageTitle from '../../components/PageTitle';
import MyStoryCard from '../../components/MyStoryCard';
import AddStoryLink from '../../components/AddStoryLink';

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
      <MyStoryCard
        key={story.firebaseKey}
        storyObj={story}
        onUpdate={() => viewJournalDetails(firebaseKey).then(setJournalDetails)}
      />
    )) : 'no stories found');

  return (
    <div className="text-center my-4">
      <PageTitle title={`Journal : ${journalDetails?.journal?.journalType}`}>
        <AddStoryLink journalKey={journalDetails?.journal?.firebaseKey} />
      </PageTitle>
      <div className="d-flex flex-wrap">
        {renderStories()}
      </div>
    </div>
  );
}
