/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

const MiddleHomeCard = ({ children }) => (
  <div
    style={{
      height: '100%',
      width: '30%',
      border: '1px solid lightgray',
    }}
  >
    {children}
  </div>
);

MiddleHomeCard.propTypes = {
  children: PropTypes.node,
};

MiddleHomeCard.defaultProps = {
  children: null,
};

export default MiddleHomeCard;
