/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <div>
          <img src="/logo.png" alt="logo" style={{ height: '90px', width: '100px', paddingRight: '10px' }} />
        </div>
        <Link passHref href="/">
          <Navbar.Brand>Yarn Momento</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/my-stories">
              <Nav.Link>My Stories</Nav.Link>
            </Link>
            <Link passHref href="/my-journal">
              <Nav.Link>My Journals</Nav.Link>
            </Link>
            {/*
            Change the nav path of all stories */}
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
