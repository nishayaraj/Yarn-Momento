/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Yarn Momento</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/myStories">
              <Nav.Link>My Stories</Nav.Link>
            </Link>
            {/* <Link passHref href="/players/new">
              <Nav.Link>Add new Story</Nav.Link>
            </Link> */}
            <Link passHref href="/myJournal">
              <Nav.Link>My Journals</Nav.Link>
            </Link>
            {/* <Link passHref href="/myJournals/new">
              <Nav.Link>Add new Journal</Nav.Link>
            </Link>
            Change the nav path of all stories */}
            <Link passHref href="/">
              <Nav.Link>All Stories</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
