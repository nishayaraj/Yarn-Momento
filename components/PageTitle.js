/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {} from 'react-bootstrap';
import PropTypes from 'prop-types';

const PageTitle = ({ title, path, children }) => (
  <div
    style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0px 12px 0px',
    }}
  >
    <Link
      href={path}
      passHref
    >
      <div
        style={{ fontSize: '24px' }}
      >
        {title}
      </div>
    </Link>
    {children}
  </div>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  children: PropTypes.node,
};

PageTitle.defaultProps = {
  children: null,
};

export default PageTitle;
