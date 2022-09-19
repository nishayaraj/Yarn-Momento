import React, { useEffect, useState } from 'react';
import LoggedoutAllStoryCard from './LoggedoutAllStoryCard';
import { useAuth } from '../utils/context/authContext';
import LoggedoutNavBar from './LoggedoutNavBar';
import { anonymouslySignIn } from '../utils/auth';
import { getAllPublicStories } from '../api';

function LoggedoutAllStories() {
  const { anonymousUser } = useAuth();
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState(undefined);

  useEffect(() => {
    anonymouslySignIn();
  }, []);

  useEffect(() => {
    if (anonymousUser) {
      getAllPublicStories()
        .then(setStories);
    }
  }, [anonymousUser]);

  // takes care of rendering stories with & without search filter:
  const renderStories = () => ((stories && stories.length > 0)
    ? stories.map((story) => {
      if (search && story.title.toLowerCase().toLowerCase().includes(search.toLowerCase())) {
        return (<LoggedoutAllStoryCard storyObj={story} key={story.firebaseKey} />);
      }
      if (!search) {
        return (<LoggedoutAllStoryCard storyObj={story} key={story.firebaseKey} />);
      }
      return '';
    }) : 'no public story');

  return (
    <div
      style={{
        paddingTop: '20px',
      }}
    >
      <LoggedoutNavBar getSearchTerm={setSearch} />
      <div
        style={{
          display: 'flex',
          margin: '30px',
          flexWrap: 'wrap',
          flexDirection: 'row',
          paddingTop: '20px',
        }}
      >
        {renderStories()}
      </div>
    </div>
  );
}

export default LoggedoutAllStories;
