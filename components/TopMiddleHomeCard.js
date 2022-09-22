/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

const TopMiddleHomeCard = ({ children }) => (
  <div
    style={{
      height: '100%',
      width: '30%',
      borderLeft: '1px solid lightgray',
      borderRight: '1px solid lightgray',
    }}
  >
    {children}
  </div>
);

TopMiddleHomeCard.propTypes = {
  children: PropTypes.node,
};

TopMiddleHomeCard.defaultProps = {
  children: null,
};

export default TopMiddleHomeCard;
