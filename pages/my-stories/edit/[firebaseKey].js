import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import StoryForm from '../../../components/forms/StoryForm';
import { getSingleStory } from '../../../api';

export default function EditStory() {
  const [editStory, setEditStory] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleStory(firebaseKey).then(setEditStory);
  }, [firebaseKey]);

  return (<StoryForm obj={editStory} />);
}
