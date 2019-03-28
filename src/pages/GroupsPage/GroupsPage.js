import React, { Component } from "react";
// import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";

import "./GroupsPage.scss";
//! components
import Add from "../../components/AddFriend_Group/AddFriend_Group";
import GroupFriends from "./GroupFriends";

class groupsPage extends Component {
  state = {
    allGroups: [
      { id: 1, name: "OS" },
      { id: 2, name: "OSAD" },
      { id: 3, name: "TAD" },
      { id: 4, name: "CPD" },
      { id: 5, name: "BDSE" }
    ],
    // groupFriends: [
    //   { id: 1, name: "Mostafa" },
    //   { id: 2, name: "Ali" },
    //   { id: 3, name: "Hamza" },
    //   { id: 4, name: "Sherif" },
    //   { id: 5, name: "Amr" }
    // ]
    selectedGroupId: null,
    error: false
  };

  // //! get groups
  // componentDidMount() {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then(res => {
  //       const posts = res.data.slice(0, 4);
  //       // const updated = posts.map(post => {
  //       //   return { ...post, author: "mostafa" };
  //       // });
  //       this.setState({ groupFriends: posts });
  //       // console.logselectedGroup.id(res);
  //     })
  //     .catch(error => {
  //       this.setState({ error: true });
  //     });
  // }

  //! select group
  selectGroupHandler = id => {
    let [selectedGroup] = this.state.allGroups.filter(group => {
      return group.id === id;
    });
    this.setState({ selectedGroupId: selectedGroup.id });
    // console.log(selectedGroup.id);
    // console.log(selectedGroup);
  };

  //! delete group
  deleteGroupHandler = groupId => {
    // console.log(groupId);
    let groups = this.state.allGroups.filter(group => {
      return group.id !== groupId;
    });
    this.setState({ allGroups: groups });
    // console.log(this.state);
  };

  // // //! testing
  // componentDidUpdate() {
  //   console.log(this.state.allGroups);
  //   if (this.state.allGroups === 0) {

  //   }
  // }

  render() {
    //! list groups
    let groupsLength = this.state.allGroups.length;
    let firstId = this.state.allGroups[0] ? this.state.allGroups[0].id : null;
    const listGroups = groupsLength ? (
      this.state.allGroups.map(group => {
        return (
          <li
            key={group.id}
            onMouseDown={() => this.selectGroupHandler(group.id)}
          >
            {group.name}
            <Button
              className="btn btn-danger"
              onClick={() => this.deleteGroupHandler(group.id)}
            >
              X
            </Button>
          </li>
        );
      })
    ) : (
      <h5>There are no groups yet</h5>
    );

    return (
      <main className="main-padding groups">
        <Container>
          <h1 className="main-title">Groups</h1>
          {/* //! add new group */}
          <section>
            <Add addType="Groups" />
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
                  <GroupFriends
                    groupId={this.state.selectedGroupId}
                    firstGroupId={firstId}
                  />
                </div>
              </Col>
            </Row>
          </section>
        </Container>
      </main>
    );
  }
}

export default groupsPage;
