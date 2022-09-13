/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

function AddStoryLink({ journalKey }) {
  const router = useRouter();
  const newStoryLink = `/my-stories/new/${journalKey || ''}`;

  const routeToNewStoryPage = () => router.push(newStoryLink);

  return (
    <div
      variant="light"
      onClick={routeToNewStoryPage}
      className="addButton"
    >
      <img
        src="/addStory.png"
        alt="Add new story"
        style={{
          height: '25px',
          objectFit: 'contain',
          marginRight: '6px',
        }}
      />
      <span
        style={{
          fontSize: '14px',
          marginTop: '4px',
        }}
      >
        Add Story
      </span>
    </div>
  );
}

AddStoryLink.propTypes = {
  journalKey: PropTypes.string,
};

AddStoryLink.defaultProps = {
  journalKey: undefined,
};

export default AddStoryLink;
