import React, { Component } from "react";
import LatestOrder from "./LatestOrder";
import { Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { Redirect } from "react-router";

class HomePage extends Component {
  constructor(props) {
    super(props);

    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    this.state = {
      user: currentUser
    };
  }

  render() {
    console.log("HOME", this.state.user);
    return this.state.user ? (
      <main className="main-padding HomePage">
        <Container>
          <LatestOrder />
        </Container>
      </main>
    ) : (
      <Redirect to="/login" />
      // <Container>
      //   <div className="text-center">
      //     <h1>You're not logged in</h1>
      //     <Link to="/login"> Please Login </Link>
      //   </div>
      // </Container>
    );
  }
}

export default HomePage;
