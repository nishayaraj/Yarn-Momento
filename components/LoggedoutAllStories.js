/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useRef } from 'react';
import LoggedoutAllStoryCard from './LoggedoutAllStoryCard';
import { useAuth } from '../utils/context/authContext';
import LoggedoutNavBar from './LoggedoutNavBar';
import { anonymouslySignIn, signIn } from '../utils/auth';
import { getAllPublicStories } from '../api';

function LoggedoutAllStories() {
  const { anonymousUser } = useAuth();
  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState(undefined);
  const allStoriesRef = useRef(undefined);

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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LoggedoutNavBar getSearchTerm={setSearch} />
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h1
            style={{
              fontSize: '50px',
              fontWeight: '700',
              lineHeight: 'normal',
              textAlign: 'left',
              margin: '2rem 0rem',
            }}
          >
            Welcome to Yarn Momento
          </h1>
          <h3
            style={{
              fontSize: '25px',
              lineHeight: 'normal',
              fontWeight: '400',
              color: '#222',
              margin: '1rem 0rem',
            }}
          >
            A public media for your creative stories
          </h3>
          <h4
            style={{
              fontSize: '25px',
              lineHeight: 'normal',
              fontWeight: '400',
              color: '#6f6f6f',
              margin: '0rem 0rem 1rem',
            }}
          >
            A private space for your personal world
          </h4>
          <div
            style={{
              marginTop: '45px',
            }}
          >
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: '2px solid #f38449',
                borderRadius: '8px',
                padding: '10px 15px',
                margin: '20px 0px',
                width: '250px',
              }}
              onClick={() => signIn()}
            >
              Sign-in to write stories
              <img
                src="/write.png"
                alt="Add new story"
                style={{
                  height: '35px',
                  objectFit: 'contain',
                  marginLeft: '15px',
                }}
              />
            </button>
            <button
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: '2px solid #f38449',
                borderRadius: '8px',
                padding: '10px 15px',
                margin: '20px 0px',
                width: '250px',
              }}
              onClick={() => {
                allStoriesRef?.current?.scrollIntoView();
              }}
            >
              Click to read stories
              <img
                src="/downArrow.png"
                alt="Scroll to view stories"
                style={{
                  height: '35px',
                  objectFit: 'contain',
                  marginLeft: '15px',
                }}
              />
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          paddingTop: '80px',
        }}
        ref={allStoriesRef}
        id="loggedoutAllStories"
      >
        {renderStories()}
      </div>
    </div>
  );
}

export default LoggedoutAllStories;
