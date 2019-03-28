import React from "react";
import {
  Form,
  FormGroup,
  Button,
  FormControl,
  FormLabel
} from "react-bootstrap";
import "./AddOrderStyles.css";
import axios from "axios";

class AddOrderComponent extends React.Component {
  state = {
    isLogin: "true",
    meal: "",
    restaurantName: "",
    menuImage: "",
    GroupName: "",
    GroupsInOrder: [],
    FriendEmail: "",
    FriendsInOrder: [],
    User_id: "",
    Friends: [],
    Groups: []
  };

  componentDidMount() {
    // get friends
    axios
      .get("/users/", {
        params: {
          id: this.state.user_id
        }
      })
      .then(function(response) {
        this.setState({
          Friends: response.data
        });
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    // get groups
    axios
      .get("/groups/", {
        params: {
          id: this.state.user_id
        }
      })
      .then(function(response) {
        console.log(response);
        this.setState({
          Groups: response.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handlerChangesMeal = event => {
    this.setState({
      meal: event.target.value
    });
    console.log(this.state.meal);
  };
  handlerChangesRestaurant = event => {
    this.setState({
      restaurantName: event.target.value
    });
    console.log(this.state.restaurantName);
  };
  handlerChangesFriends = event => {
    this.setState({ FriendEmail: event.target.value });
    // filter and get matched friend
    const friend = this.state.Friends.filter(friendSelected => {
      return friendSelected.email === this.state.FriendEmail;
    });

    // push to array of friend selected
    this.setState({
      FriendsInOrder: [...this.state.FriendsInOrder, friend]
    });
    this.props.handlerFriendFromParent(this.state.FriendsInOrder);
  };
  handlerChangesGroups = event => {
    this.setState({ GroupName: event.target.value });
    const group = this.state.Groups.filter(groupSelected => {
      return groupSelected.name === this.state.GroupName;
    });
    // push to array of friend selected
    this.setState({
      GroupsInOrder: [...this.state.GroupsInOrder, group]
    });
    this.props.handlerGroupFromParent(this.state.GroupsInOrder);
  };
  handlerChangesMenuImage = event => {
    this.setState({
      menuImage: event.target.value
    });
    console.log(this.state.menuImage);
  };
  handlerSubmit = event => {
    event.preventDefault();
    // order axios:post request
    axios
      .post(
        "/order",
        {
          meal: this.state.meal,
          restaurantName: this.state.restaurantName,
          menuImage: this.state.menuImage,
          friends: this.state.FriendsInOrder,
          groups: this.state.GroupsInOrder
        },
        {
          params: {
            id: this.state.user_id
          }
        }
      )
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  // handlerFriendFromParent={this.handleFriendsData}
  // handlerGroupFromParent={this.handleGroupsData}

  componentWillReceiveProps(nextProps) {
    const deletedFriend = nextProps.friend_deleted_id;
    const newFriends = this.state.FriendsInOrder.filter(friend => {
      return friend._id !== deletedFriend;
    });
    this.setState({ FriendsInOrder: newFriends });
    const deletedGroup = nextProps.group_deleted_id;
    const newGroup = this.state.FriendsInOrder.filter(friend => {
      return friend._id !== deletedFriend;
    });
    this.setState({ GroupsInOrder: newFriends });
  }

  render() {
    return (
      // this.state.isLogin === true ? (
      <div className="AddOrderComponent">
        <h1>Add New Order</h1>
        <Form>
          <FormGroup onSubmit={this.handlerSubmit}>
            <FormLabel>Select Meal:</FormLabel>
            <FormControl as="select" required onClick={this.handlerChangesMeal}>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </FormControl>
          </FormGroup>
          <FormGroup>
            <FormLabel>Restaurant Name: </FormLabel>
            <FormControl
              type="text"
              onChange={this.handlerChangesRestaurant}
              required
              placeholder="Restaurant Name"
              value={this.state.restaurantName}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Friend's Name - Invite your friends </FormLabel>
            <FormControl
              type="text"
              placeholder="Friend's Name"
              onChange={this.handlerChangesFriends}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Group's Name - Invite your groups </FormLabel>
            <FormControl
              type="text"
              placeholder="Groups's Name"
              onChange={this.handlerChangesGroups}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Put Menu Image</FormLabel>
            <FormControl
              type="text"
              value={this.state.menuImage}
              onChange={this.handlerChangesMenuImage}
              placeholder="Menu Image"
            />
          </FormGroup>
          <Button variant="primary" type="submit" block>
            Add Order
          </Button>
        </Form>
      </div>
    );
    // :
    //*<Redirect to=""/>*/
  }
}

export default AddOrderComponent;
