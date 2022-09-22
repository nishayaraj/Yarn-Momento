/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';

const HomeCardRow = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: '33.33%',
    }}
  >
    {children}
  </div>
);

HomeCardRow.propTypes = {
  children: PropTypes.node,
};

HomeCardRow.defaultProps = {
  children: null,
};

export default HomeCardRow;
