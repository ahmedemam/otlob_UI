import React from "react";

import { NavLink } from "react-router-dom";
import { Navbar, Nav, Button, Image } from "react-bootstrap";

const navbar = () => {
  return (
    <header>
      <Navbar variant="light" expand="md">
        <Navbar.Brand>
          <NavLink to="/" exact>
            <img
              width="140"
              height="40"
              className="d-inline-block align-top"
              alt="Logo"
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <ul>
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
            </ul>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          </Form> */}
          <div>
            <Image width="50" height="50" roundedCircle />
            <Button variant="danger">log out</Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default navbar;
