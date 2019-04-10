import React, { Component } from "react";

import { NavLink, Link, Redirect } from "react-router-dom";
import { Navbar, Nav, Button, Image } from "react-bootstrap";
import "./navbar.scss";
// import axios from "axios";
// import { browserHistory } from "react-router-dom";
// import { browserHistory } from "react-router";

class navbar extends Component {
  constructor(props) {
    super(props);
    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    this.logOutHandler = this.logOutHandler.bind(this);
    this.state = {
      user: currentUser
    };
    console.log("NAVBAR", this.state.user);
  }

  //! logout
  logOutHandler() {
    // console.log(localStorage.getItem("current-user"));
    // localStorage.removeItem("current-user");
    localStorage.clear();
    // window.location.href("/login");
    // this.props.history.push("/login");
    // browserHistory.push("/login");

    // let test = this.state.user;
    // console.log(test);
    // console.log(this.state.user._id.$oid);
    // axios
    //   .delete(`/v1/session?_id=${this.state.user._id.$oid}`)
    //   .then(res => {
    //     console.log(res.headers);
    //     console.log(res);
    //     // if (res.headers === 204) {
    //     // localStorage.removeItem("current-user");
    //     // this.props.history.push("/login");
    //     // }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  render() {
    // return this.state.user ? (
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
              <Button variant="danger" onClick={this.logOutHandler}>
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
    // ) : (
    //   <span />
    // );
  }
}

export default navbar;
