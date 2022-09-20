/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleStory } from '../../api/storiesData';
import ReadStoryCard from '../../components/ReadStoryCard';

export default function ViewStoryCards() {
  const [storyDetails, setStoryDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleStory(firebaseKey).then(setStoryDetails);
  }, [firebaseKey]);

  return (<ReadStoryCard storyObj={storyDetails} />);
}
