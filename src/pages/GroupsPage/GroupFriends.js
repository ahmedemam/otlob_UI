import React, { Component } from "react";
import axios from "axios";

import { Row } from "react-bootstrap";
//! components
import Add from "../../components/AddFriend_Group/AddFriend_Group";
import Friend from "../../components/Modal/friend";

class GroupFriends extends Component {
  state = {
    loadedGroup: null,
    groupFriends: [],
    error: false
  };

  // componentDidUpdate() {
  //   if (this.props.groupId) {
  //     //! to not send request if id = null
  //     if (
  //       !this.state.loadedPost ||
  //       (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
  //     ) {
  //       //! to ensure that the request will be done if only we actually loaded a new post and this post's id is !== the id we already have in props.
  //       //! loadedPost is null initially so check first if we don't have a loaded post in state. || we have it && it have a different id.
  //       axios.get("/posts/" + this.props.id).then(res => {
  //         this.setState({ loadedPost: res.data });
  //         //! updating state from within componetnDidUpdate() will create an infinite loop of requests because -with setState()- the component will be updated and componetnDidUpdate() will be executed again.
  //       });
  //     }
  //   }
  // }

  //! get friends conditionally on group id
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        const posts = res.data.slice(0, 4);
        // const updated = posts.map(post => {
        //   return { ...post, author: "mostafa" };
        // });
        this.setState({ groupFriends: posts });
        // console.log(res);
      })
      .catch(error => {
        this.setState({ error: true });
      });
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
        <h5>There are no friends In this Group</h5>
      );
      console.log(groupFriendsLength);
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
