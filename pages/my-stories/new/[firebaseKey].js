import React from 'react';
import { useRouter } from 'next/router';
import StoryForm from '../../../components/forms/StoryForm';

export default function AddStory() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  return <StoryForm obj={{ journalId: firebaseKey }} />;
}
