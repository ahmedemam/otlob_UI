import React, { Component } from "react";
import LatestOrder from "./LatestOrder";
import { Container } from "react-bootstrap";

class HomePage extends Component {
  render() {
    return (
      <main className="main-padding HomePage">
        <Container>
          <LatestOrder />
        </Container>
      </main>
    );
  }
}

export default HomePage;
