import React, { Component } from "react";
import axios from "axios";

import { Row } from "react-bootstrap";
//! components
import Add from "../../components/AddFriend_Group/AddFriend_Group";
import Friend from "../../components/Modal/friend";

class GroupFriends extends Component {
  state = {
    // loadedGroup: null,
    currentGroupId: null,
    groupFriends: [],
    error: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.groupId !== this.state.currentGroupId) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts/" + nextProps.groupId)
        .then(res => {
          let groupFriends = [{ ...res.data }];
          this.setState({
            groupFriends: groupFriends,
            currentGroupId: nextProps.groupId
          });
          // console.log(groupFriends);
        });
    }
    if (!nextProps.firstGroupId) {
      this.setState({
        groupFriends: []
      });
    }
  }

  // componentDidUpdate() {
  //   console.log("updated");
  // }

  // ! get friends conditionally on group id
  //! will be needed to render first group friends
  componentDidMount() {
    if (this.props.firstGroupId) {
      axios
        .get(
          "https://jsonplaceholder.typicode.com/posts/" +
            this.props.firstGroupId
        )
        .then(res => {
          const friends = [{ ...res.data }];
          this.setState({
            groupFriends: friends,
            currentGroupId: this.props.firstGroupId
          });
        })
        .catch(error => {
          this.setState({ error: true });
        });
    }
  }

  render() {
    //! list friends
    let listGroupFriends = (
      <p style={{ textAlign: "center" }}>Something Went Wrong with server</p>
    );
    if (!this.state.error) {
      let groupFriendsLength = this.state.groupFriends.length;
      listGroupFriends = groupFriendsLength ? (
        this.state.groupFriends.map(friend => {
          return (
            <Friend key={friend.id} title={friend.title} body={friend.body} />
          );
        })
      ) : (
        <h5>There are no friends to Show</h5>
      );
      // console.log(groupFriendsLength);
    }
    return (
      <>
        <h5>{this.state.selectedGroup} Group</h5>
        <Add addType="Your Friend Name" />
        <Row className="list">{listGroupFriends}</Row>
      </>
    );
  }
}

export default GroupFriends;

// componentDidUpdate() {
//   // console.log(this.props.groupId);
//   if (this.props.groupId) {
//     //! to not send request if id = null
//     if (
//       !this.state.loadedGroup ||
//       (this.state.loadedGroup &&
//         this.state.loadedGroup.id !== this.props.groupId)
//     ) {
//       //! to ensure that the request will be done if only we actually loaded a new group and this group's id is !== the id we already have in props.
//       //! loadedGroup is null initially so check first if we already have a loaded group in state. || we have it && it has a different id.
//       axios.get("/posts/" + this.props.groupId).then(res => {
//       });
//     }
//   }
// }
