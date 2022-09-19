/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { signOut } from '../utils/auth';

export default function NavBar() {
  const router = useRouter();

  const handleSignoutClick = () => {
    signOut();
    router.replace('/');
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
        <img src="/logo.png" alt="logo" style={{ height: '50px', paddingRight: '10px' }} />
        <Link passHref href="/">
          <Navbar.Brand>
            Yarn Momento
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          style={{ justifyContent: 'right' }}
        >
          <Nav>
            <Link
              passHref
              href="/my-journal"
            >
              <Nav.Link>My Journals</Nav.Link>
            </Link>
            <Link passHref href="/my-stories">
              <Nav.Link>My Stories</Nav.Link>
            </Link>
            <Link passHref href="/all-stories">
              <Nav.Link>All Stories</Nav.Link>
            </Link>
            <Button variant="danger" onClick={handleSignoutClick}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
