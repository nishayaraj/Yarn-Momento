/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import PageTitle from '../../components/PageTitle';
import MyStoryCard from '../../components/MyStoryCard';
import { getMyStories } from '../../api';
import AddStoryLink from '../../components/AddStoryLink';

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
      <PageTitle title="My Stories">
        <AddStoryLink />
      </PageTitle>
      <div className="d-flex flex-wrap">
        {stories.map((story) => (
          <MyStoryCard
            key={story.firebaseKey}
            storyObj={story}
            onUpdate={getAllTheStories}
          />
        ))}
      </div>
    </div>
  );
}

export default MyStories;
