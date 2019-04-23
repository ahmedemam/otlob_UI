import React, { Component } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";

class Add extends Component {
  state = {
    Friends: [],
    Groups: [],
    GroupsFriends: [],
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
    const valueInputField = this.state.inputField;

    let route = "";
    //! =================================
    let parameter = "";
    //! =================================

    //! add friend condition
    if (this.props.type === "Friends") {
      route = "friend";
      parameter = "email";
      const currentFriends = this.props.friendsArr;
      let statusEmail = false;
      currentFriends.forEach(friend => {
        if (friend.email === this.state.inputField) {
          statusEmail = true;
        }
      });
      if (!statusEmail) {
        axios
          .post(
            `http://localhost:3000/v1/user/${
              this.state.user._id.$oid
            }/${route}`,
            {
              email: valueInputField
            }
          )
          .then(response => {
            if (response.status === 204) {
              // test
            } else if (response.status === 200) {
              const friendsProps = this.props.friendsArr;
              friendsProps.push(response.data);
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
      //! add group condition
    } else if (this.props.type === "Groups") {
      const currentGroups = this.props.groupsArr;
      let statusGroup = false;
      currentGroups.forEach(group => {
        if (group.name === this.state.inputField) {
          statusGroup = true;
          console.log("YES");
        }
      });
      route = "group";
      parameter = "name";
      if (!statusGroup) {
        axios
          .post(
            `http://localhost:3000/v1/user/${
              this.state.user._id.$oid
            }/${route}`,
            {
              name: valueInputField
            }
          )
          .then(response => {
            if (response.status === 204) {
              // test
            } else if (response.status === 200) {
              const groupsProps = this.props.groupsArr;
              let addedGroup = response.data;
              addedGroup = {
                ...addedGroup,
                friends: []
              };
              groupsProps.push(addedGroup);
              this.setState({
                Groups: groupsProps
              });
              this.props.newGroups(this.state.Groups);
              console.log("Groups:Add", this.state.Groups);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    } else if (this.props.type === "FriendsToGroups") {
      // http://localhost:3000/v1/user/5cb38c36f5ddaf66e5c4f435/group/5cb38d12f5ddaf66e5c4f43e/friend
      // console.log(">>>>>>>>>>>>>>", this.props.selectedGroup);
      route = "group";
      let selectedGroup = this.props.selectedGroup;
      let currentGroupsFriends = this.props.GroupsFriends;
      axios
        .post(
          `http://localhost:3000/v1/user/${this.state.user._id.$oid}/${route}/${
            selectedGroup._id.$oid
          }/friend`,
          {
            email: valueInputField
          }
        )
        .then(response => {
          if (response.status === 204) {
            // test
          } else if (response.status === 200) {
            selectedGroup = {
              ...selectedGroup,
              friends: [...selectedGroup.friends, response.data]
            };
          }
          // console.log(">>>>>>>>>>>", selectedGroup);
          // const friends = this.props.groupsFriendsArr;
          // friends = [...friends, response.data];
          console.log(">Friedns>", selectedGroup.friends);
          this.props.newGroupsFriends(selectedGroup);
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
