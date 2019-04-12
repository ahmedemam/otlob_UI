import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

class Add extends Component {
  state = {
    Friends: [],
    inputField: "",
    user: ""
  };

  componentWillMount() {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    this.setState({
      user: currentUser
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    let route = "";
    //! =================================
    let parameter = "";
    //! =================================
    if (this.props.type === "Friends") {
      route = "friend";
      parameter = "email";
    } else if (this.props.type === "Groups") {
      route = "groups";
      parameter = "name";
    }
    const valueInputField = this.state.inputField;
    const currentFriends = this.props.arrName;
    console.log("Friend:", currentFriends);
    let statusEmail = false;
    currentFriends.forEach(friend => {
      if (friend.email === this.state.inputField) {
        statusEmail = true;
      }
    });

    // console.log(notExistedFriend);
    if (!statusEmail) {
      axios
        .post(
          `http://localhost:3000/v1/user/${this.state.user._id.$oid}/${route}`,
          {
            email: valueInputField
          }
        )
        .then(response => {
          if (response.status === 204) {
            // console.log("204", response.data);
          } else if (response.status === 200) {
            // console.log("200", response.data);
            const friendsProps = this.props.arrName;
            friendsProps.push(
              // _id: response.data._id,
              // name: response.data.name,
              // email: response.data.email,
              // image: response.data.image
              response.data
            );
            this.setState({
              Friends: friendsProps
            });
            this.props.newFriends(this.state.Friends);
            console.log("Freiends:Add", this.state.Friends);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleChange = event => {
    this.setState({ inputField: event.target.value });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row className="add-frined-group">
          <Col sm={3} className="text">
            {this.props.addType}
          </Col>
          <Col sm={5} className="input">
            <Form.Group>
              <Form.Control
                onChange={this.handleChange}
                require
                type={this.props.inputType}
              />
            </Form.Group>
          </Col>
          <Col sm={2} className="add-btn">
            <Button type="submit" variant="success">
              Add
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Add;
