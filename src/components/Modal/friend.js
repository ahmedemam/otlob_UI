import React from "react";
import { Col } from "react-bootstrap";

// import './Post.css';

const friend = props => (
  <Col xs={6} className="mb-4">
    <div className="friend-block">
      <h4>{props.title}</h4>
      <div>{props.body}</div>
    </div>
  </Col>
);

export default friend;
