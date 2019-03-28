import React, {Component} from "react";
import AddOrderComponent from "./AddOrderComponent";
import {Alert, Table, Button} from "react-bootstrap";
import "./AddOrderPageStyle.css";


class AddOrderPage extends Component {

    state = {
        friends: [],
        friend_deleted: "",
        groups: [],
        group_deleted: "",
    };

    // componentWillReceiveProps
    // componentWillReceiveProps(nextProps, nextContext) {
    //
    // }

    handleFriendsData(data) {
        this.setState({
            friends: data
        });
    }

    handleGroupsData(data) {
        this.setState({
            groups: data
        });
    }

    handleDeleteFriends = deletedId => {
        this.setState({friends: this.state.friends.filter(friend => friend._id !== deletedId)});
        this.setState({friend_deleted: deletedId});
    };
    handleDeleteGroups = deletedId => {
        this.setState({groups: this.state.groups.filter(group => group._id !== deletedId)});
        this.setState({group_deleted: deletedId});
    };

    render() {
        const {friends, groups, error} = this.state;
        const friendsView = friends.length ? friends.map(friend =>
            <tr key={friend._id}>
                <td>{friend.email}</td>
                <td><Button color='danger' onClick={() => this.handleDeleteFriends(friend._id)}>Delete</Button></td>
            </tr>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;
        const groupsView = groups.length ? groups.map(group =>
            <tr key={group._id}>
                <td>{group.name}</td>
                <td><Button color='danger' onClick={() => this.handleDeleteGroups(group._id)}>Delete</Button></td>
            </tr>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;
        return (
            <div className='AddOrderPage'>
                <AddOrderComponent group_deleted_id={this.state.group_deleted}
                                   friend_deleted_id={this.state.friend_deleted}
                                   handlerFriendFromParent={this.handleFriendsData}
                                   handlerGroupFromParent={this.handleGroupsData}

                />
                <Table>
                    <thead>
                    </thead>
                    <tbody>
                    {friendsView}
                    {groupsView}
                    </tbody>
                </Table>
            </div>
            // : <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
        )
    }
}


export default AddOrderPage;
