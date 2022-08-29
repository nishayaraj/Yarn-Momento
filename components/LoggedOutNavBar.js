/* eslint-disable no-console */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button, Form,
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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Yarn Momento</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Button variant="danger" onClick={signIn}>Sign In</Button>
          </Nav>
          <Form
            className="d-flex"
            onSubmit={searchHandler}
          >
            <Form.Control
              type="search"
              value={searchTerm}
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={onChangeHandler}
            />
            <Button
              type="submit"
              variant="outline-success"
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

LoggedOutNavBar.propTypes = {
  getSearchTerm: PropTypes.func.isRequired,
};
