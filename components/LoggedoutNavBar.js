/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Button, Form,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { signIn } from '../utils/auth';

export default function LoggedOutNavBar({ getSearchTerm }) {
  const [searchTerm, setSearchTerm] = useState('');
  const searchHandler = (e) => {
    e.preventDefault();
    getSearchTerm(e.target[0].value);
  };

  const onChangeHandler = (e) => {
    setSearchTerm(e.target.value);
    getSearchTerm(e.target.value);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      fixed="top"
      style={{ boxShadow: '0 2px 4px -1px rgb(57 76 96 / 15%)' }}
    >
      <Container>
        <div>
          <img src="/logo.png" alt="logo" style={{ height: '50px', paddingRight: '10px' }} />
        </div>
        <Link passHref href="/">
          <Navbar.Brand>Yarn Momento</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-loggedout-navbar-nav" />
        <Navbar.Collapse id="responsive-loggedout-navbar-nav" style={{ justifyContent: 'right' }}>
          <div>
            <Form
              className="d-flex logoutNavItem-search"
              onSubmit={searchHandler}
              style={{
                fontSize: '14px',
                border: '1px solid lightgray',
                background: 'white',
                borderRadius: '8px',
              }}
            >
              <Form.Control
                type="search"
                value={searchTerm}
                placeholder="Story title"
                aria-label="Story title search"
                onChange={onChangeHandler}
                className="loggedout-nav-search-input"
              />
              <button
                type="submit"
                variant="outline-success"
                style={{
                  color: 'green',
                  border: 'none',
                  background: 'none',
                }}
              >
                Search
              </button>
            </Form>
          </div>
          <div
            className="logoutNavItem-loginbutton"
          >
            <Button variant="primary" onClick={signIn} style={{ fontSize: '14px' }}>Sign In</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

LoggedOutNavBar.propTypes = {
  getSearchTerm: PropTypes.func.isRequired,
};
