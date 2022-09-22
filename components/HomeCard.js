/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

const HomeCard = ({ children }) => (
  <div
    style={{
      height: '100%',
      width: '30%',
    }}
  >
    {children}
  </div>
);

HomeCard.propTypes = {
  children: PropTypes.node,
};

HomeCard.defaultProps = {
  children: null,
};

export default HomeCard;
