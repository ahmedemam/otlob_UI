import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import avatar from "../../assets/avatar.png";
import "./GroupsPage.scss";
//! components
import Add from "../../components/AddFriend_Group/AddFriend_Group";
// import GroupFriends from "./GroupFriends";

class groupsPage extends Component {
  constructor(props) {
    super(props);

    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    this.state = {
      user: currentUser,
      allGroups: [],
      selectedGroupId: null,
      error: false
    };
  }

  //! get groups
  componentDidMount() {
    if (this.state.user) {
      axios
        .get(`http://localhost:3000/v1/user/${this.state.user._id.$oid}/group`)
        .then(res => {
          console.log("Groups", res.data);
          this.setState({ allGroups: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  //! select group
  selectGroupHandler = id => {
    let [selectedGroup] = this.state.allGroups.filter(group => {
      return group._id.$oid === id;
    });
    this.setState({ selectedGroupId: selectedGroup._id.$oid });

    // console.log(selectedGroup.friend_id);
    console.log(selectedGroup);
  };

  //! delete group
  deleteGroupHandler = groupId => {
    let groups = this.state.allGroups.filter(group => {
      return group._id.$oid !== groupId;
    });
    axios
      .delete(
        `http://localhost:3000/v1/user/${
          this.state.user._id.$oid
        }/group/${groupId}`
      )
      .then(res => {
        console.log(res.data);
        this.setState({ allGroups: groups });
      })
      .catch(err => {
        console.log(err.data);
      });
  };

  //! get Groups
  getGroupsHandler = newGroups => {
    this.setState({
      allGroups: newGroups
    });
    console.log("UPDATED STATE", this.state.allGroups);
  };

  render() {
    //! list groups
    let groupsLength = this.state.allGroups.length;
    let { allGroups } = this.state;
    let firstGroupId = this.state.allGroups[0]
      ? this.state.allGroups[0]._id.$oid
      : null;
    // console.log("HEREREEEE=>", this.state.allGroups);
    const listGroups = groupsLength ? (
      this.state.allGroups.map(group => {
        return (
          <li
            key={group._id.$oid}
            onMouseDown={() => this.selectGroupHandler(group._id.$oid)}
          >
            {group.name}
            <Button
              className="btn btn-danger"
              onClick={() => this.deleteGroupHandler(group._id.$oid)}
            >
              X
            </Button>
          </li>
        );
        // console.log("FRIENDS=====>", group.friends);
        // return group;
      })
    ) : (
      <h5>There are no groups yet</h5>
    );
    // /user/:user_id/group/:group_id/friend/:friend_id/
    const eachGroupFriends = this.state.allGroups;
    //! list groups
    const eachGroupFriendsView = eachGroupFriends.length ? (
      allGroups[0].friends.map(friend => (
        <Col sm={4} key={friend._id.$oid}>
          <div className="FriendsPage__each-friend">
            <img src={avatar} alt="friend" width="70" height="70" />
            <span>{friend.name}</span>
            <span>{friend.email}</span>
            <span>
              <Button onClick={() => this.handleUnFriend(friend._id.$oid)}>
                UnFriend
              </Button>
            </span>
          </div>
        </Col>
      ))
    ) : this.state.error ? (
      <h1>
        <Alert color="danger">{this.state.error}</Alert>
      </h1>
    ) : null;

    // return (
    // console.log("GROUPS", this.state.user);
    return this.state.user ? (
      <main className="main-padding groups">
        <Container>
          <h1 className="main-title">Groups</h1>
          {/* //! add new group */}
          <section>
            <Add
              addType="Groups"
              inputType="text"
              type="Groups"
              groupsArr={this.state.allGroups}
              newGroups={this.getGroupsHandler}
            />
          </section>
          {/* //! Groups */}
          <section className="groups__myGroups">
            <Row>
              {/* //! all groups */}
              <Col sm={4}>
                <div className="groups__all-groups">
                  <h5>My Groups</h5>
                  <ul>{listGroups}</ul>
                </div>
              </Col>
              {/* //! groups' friends */}
              <Col sm={8}>
                <div className="groups__selected-group">
                  <Add
                    addType="Your Friend Name"
                    inputType="email"
                    type="Friends"
                    friendsArr={this.state.Friends}
                    newFriends={this.getFriendsHandler}
                  />
                  <Row>{eachGroupFriendsView}</Row>
                  {/* <GroupFriends
                    groupId={this.state.selectedGroupId}
                    firstGroupId={firstId}
                  /> */}
                </div>
              </Col>
            </Row>
          </section>
        </Container>
      </main>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default groupsPage;
