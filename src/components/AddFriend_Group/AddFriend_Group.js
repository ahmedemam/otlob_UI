import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

class Add extends Component {
  render() {
    return (
      <Row className="add-frined-group">
        <Col sm={3} className="text">
          {this.props.addType}
        </Col>
        <Col sm={5} className="input">
          <Form>
            <Form.Group>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
        </Col>
        <Col sm={2} className="add-btn">
          <Button variant="success">Add</Button>
        </Col>
      </Row>
    );
  }
}

export default Add;
