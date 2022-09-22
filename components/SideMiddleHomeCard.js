/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

const SideMiddleHomeCard = ({ children }) => (
  <div
    style={{
      height: '100%',
      width: '30%',
      borderTop: '1px solid lightgray',
      borderBottom: '1px solid lightgray',
    }}
  >
    {children}
  </div>
);

SideMiddleHomeCard.propTypes = {
  children: PropTypes.node,
};

SideMiddleHomeCard.defaultProps = {
  children: null,
};

export default SideMiddleHomeCard;
