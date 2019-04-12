import React from "react";
import Add from "../../components/AddFriend_Group/AddFriend_Group";
import axios from "axios";
import { Alert, Table, Button, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
// import friend from "../../components/Modal/friend";

import avatar from "./../../assets/avatar.png";

class FriendsPage extends React.Component {
  constructor(props) {
    super(props);

    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    this.state = {
      user: currentUser,
      Friends: []
    };
  }
  // state = {
  // };

  componentDidMount() {
    // ?user_id=${user._id}
    axios
      .get(`http://localhost:3000/v1/user/${this.state.user._id.$oid}/friend`)
      .then(response => {
        console.log(response);
        this.setState({ Friends: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleUnFriend = friend_id => {
    // filter
    const friends = this.state.Friends.filter(friend => {
      return friend._id.$oid !== friend_id;
    });
    this.setState({ Friends: friends });
    // user-id and friend-id
    axios({
      method: "delete",
      url: `http://localhost:3000/v1/user/${
        this.state.user._id.$oid
      }/friend/${friend_id}`
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  //! get friends
  getFriendsHandler = newFriends => {
    // let currentFriends = this.state.Friends;
    this.setState({
      Friends: newFriends
    });
    // let updatedFriends = currentFriends.push(newFriend);
    // this.setState({ Friends: updatedFriends });
    // console.log("CURRENT", currentFriends);
    console.log("UPDATED STATE", this.state.Friends);
  };

  render() {
    const { Friends, error } = this.state;
    const friendsView = Friends.length ? (
      Friends.map(friend => (
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
        // <tr key={friend._id.$oid}>
        //   <td>
        //     <img src={avatar} alt="friend" width="70" height="70" />
        //     <span>{friend.name}</span>
        //     <span>{friend.email}</span>
        //     <span>
        //       <Button onClick={() => this.handleUnFriend(friend._id.$oid)}>
        //         UnFriend
        //       </Button>
        //     </span>
        //   </td>
        // </tr>
      ))
    ) : error ? (
      <h1>
        <Alert color="danger">{error}</Alert>
      </h1>
    ) : null;

    console.log("FRIENDS", this.state.user);
    return this.state.user ? (
      // return (
      <main className="main-padding FriendsPage">
        <Container>
          <h1 className="main-title">Friends</h1>
          <Add
            addType="Your Friend Email"
            inputType="email"
            type="Friends"
            arrName={this.state.Friends}
            newFriends={this.getFriendsHandler}
          />
          <section className="FriendsPage__friends">
            <Row>{friendsView}</Row>
          </section>
          {/* <Table>
            <thead>
              <tr>
                <th>Friends</th>
              </tr>
            </thead>
            <tbody>{friendsView}</tbody>
          </Table> */}
        </Container>
      </main>
    ) : (
      <Redirect to="/login" />
    );
  }
}

export default FriendsPage;
