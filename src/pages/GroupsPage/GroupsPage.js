import axios from "axios";
import React, { Component } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import avatar from "../../assets/avatar.png";
//! components
import Add from "../../components/AddFriend_Group/AddFriend_Group";
import "./GroupsPage.scss";
// import GroupFriends from "./GroupFriends";

class groupsPage extends Component {
  constructor(props) {
    super(props);

    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    this.state = {
      user: currentUser,
      allGroups: [],
      GroupsFriends: [],
      selectedGroup: {},
      selectedGroupId: 0,
      selectedGroupIndex: 0,
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
    // console.log("did", this.state.selectedGroupId);
  }

  //! select group
  selectGroupHandler = (id, index) => {
    let [selectedGroup] = this.state.allGroups.filter(group => {
      return group._id.$oid === id;
    });
    this.setState({
      selectedGroupId: selectedGroup._id.$oid,
      selectedGroupIndex: index,
      GroupsFriends: selectedGroup.friends,
      selectedGroup: selectedGroup
    });

    // console.log(selectedGroup.friend_id);
    console.log("selected", selectedGroup);
    // console.log(index);
    // console.log(this.state.allGroups);
    // console.log(this.state.selectedGroupId);
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
        this.setState({ allGroups: groups, selectedGroupIndex: 0 });
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

  //! get Groups Friends
  getGroupsFriendsHandler = selectedGroup => {
    const { allGroups, selectedGroupIndex } = this.state;
    allGroups[selectedGroupIndex] = selectedGroup;
    this.setState({ allGroups });
  };

  render() {
    //! list groups
    let groupsLength = this.state.allGroups.length;
    const { allGroups } = this.state;
    // let firstGroupId = this.state.allGroups[0]
    //   ? this.state.allGroups[0]._id.$oid
    //   : null;
    // console.log("HEREREEEE=>", this.state.allGroups);
    const listGroups = groupsLength ? (
      this.state.allGroups.map((group, index) => {
        return (
          <div className="groups__each-group">
            <div
              key={group._id.$oid}
              onClick={() => this.selectGroupHandler(group._id.$oid, index)}
            >
              {group.name}
            </div>
            <Button
              className="btn btn-danger"
              onClick={() => this.deleteGroupHandler(group._id.$oid)}
            >
              X
            </Button>
          </div>
        );
        // console.log("FRIENDS=====>", group.friends);
        // return group;
      })
    ) : (
      <h5>There are no groups yet</h5>
    );

    //! list friends of selected group
    const eachGroupFriendsView = allGroups.length ? (
      // <p>Friends</p>
      allGroups[this.state.selectedGroupIndex].friends ? (
        allGroups[this.state.selectedGroupIndex].friends.map(friend => (
          <Col sm={4} key={friend._id.$oid}>
            <div className="FriendsPage__each-friend">
              <img src={avatar} alt="friend" width="70" height="70" />
              <span>{friend.name}</span>
              <span>
                <Button onClick={() => this.handleUnFriend(friend._id.$oid)}>
                  UnFriend
                </Button>
                <span>{friend.email}</span>
              </span>
            </div>
          </Col>
        ))
      ) : (
        <p>There are No Friends In this Group</p>
      )
    ) : (
      <p>There are No Groups Yet</p>
    );

    // const eachGroupFriends = this.state.allGroups;
    // //! list groups
    // const eachGroupFriendsView = eachGroupFriends.length ? (
    //   allGroups[this.state.selectedGroupIndex].friends.map(friend => (
    //     <Col sm={4} key={friend._id.$oid}>
    //       <div className="FriendsPage__each-friend">
    //         <img src={avatar} alt="friend" width="70" height="70" />
    //         <span>{friend.name}</span>
    //         <span>{friend.email}</span>
    //         <span>
    //           <Button onClick={() => this.handleUnFriend(friend._id.$oid)}>
    //             UnFriend
    //           </Button>
    //         </span>
    //       </div>
    //     </Col>
    //   ))
    // ) : this.state.error ? (
    //   <h1>
    //     <Alert color="danger">{this.state.error}</Alert>
    //   </h1>
    // ) : null;

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
                  <div>{listGroups}</div>
                </div>
              </Col>
              {/* //! groups' friends */}
              <Col sm={8}>
                <div className="groups__selected-group">
                  <Add
                    addType="Your Friend Name"
                    inputType="email"
                    type="FriendsToGroups"
                    groupsFriendsArr={this.state.GroupsFriends}
                    // newFriends={this.getFriendsHandler}
                    selectedGroup={this.state.selectedGroup}
                    newGroupsFriends={this.getGroupsFriendsHandler}
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
