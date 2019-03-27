import React from "react";

import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button, Image } from "react-bootstrap";
import "./navbar.scss";

const navbar = () => {
  return (
    <header>
      <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
        <Navbar.Brand>
          <NavLink to="/" exact>
            Yalla Notlob
          </NavLink>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <ul className="navlinks">
              <li>
                <NavLink to="/" exact>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/friends">Friends</NavLink>
              </li>
              <li>
                <NavLink to="/groups">Groups</NavLink>
              </li>
              <li>
                <NavLink to="/orders">Orders</NavLink>
              </li>
              <li>
                <NavLink to="/order-details">Order details</NavLink>
              </li>
            </ul>
          </Nav>
          <Nav>
            <Image width="50" height="50" roundedCircle />
            <Nav.Link href="#user" className="align-self-center">
              Mostafa Ali
            </Nav.Link>
            <Button variant="danger">Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default navbar;
