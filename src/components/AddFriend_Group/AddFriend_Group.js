import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

class Add extends Component {
  state = {
    inputField: ""
  };

  handleSubmit = () => {
    let route = "";
    //! =================================
    let parameter = "";
    //! =================================
    if (this.props.type === "Friends") {
      route = "friends";
      parameter = "email";
    } else if (this.props.type === "Groups") {
      route = "groups";
      parameter = "name";
    }
    const valueInputField = this.state.inputField;
    axios
      .post(route, {
        params: {
          parameter: valueInputField
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleChange = event => {
    this.setState({ inputField: event.target.value });
  };

  render() {
    return (
      <Row className="add-frined-group">
        <Col sm={3} className="text">
          {this.props.addType}
        </Col>
        <Col sm={5} className="input">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Control
                onChange={this.handleChange}
                require
                type={this.props.inputType}
              />
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
