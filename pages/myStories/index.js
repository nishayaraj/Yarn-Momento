/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import StoryCard from '../../components/StoryCard';
import { getMyStories } from '../../api/storiesData';

function MyStories() {
  const [stories, setStories] = useState([]);

  const { user } = useAuth();

  const getAllTheStories = () => {
    getMyStories(user.uid).then(setStories);
  };

  useEffect(() => {
    getAllTheStories();
  }, [user]);

  return (
    <div className="text-center my-4">
      <Link href="/myStories" passHref>
        <h1>My Stories</h1>
      </Link>
      <div className="d-flex flex-wrap">
        {stories.map((story) => (
          <StoryCard key={story.firebaseKey} storyObj={story} onUpdate={getAllTheStories} />
        ))}
      </div>

    </div>
  );
}

export default MyStories;
