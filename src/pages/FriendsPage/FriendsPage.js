import React from "react";
import Add from "../../components/AddFriend_Group/AddFriend_Group";
import axios from "axios";
import {Alert, Table, Button} from "react-bootstrap";
import friend from "../../components/Modal/friend";


class FriendsPage extends React.Component {
    state = {
        Friends: [],
    };

    componentDidMount() {
        // ?user_id=${user._id}
        axios.get('friends')
            .then((response) => {
                console.log(response);
                this.setState({Friends: response.data});
            }).catch((error) => {
            console.log(error);
        });
    }

    handleUnFriend = (friend_id) => {
        // filter
        const friends = this.state.Friends.filter(friend => {
            return friend._id !== friend_id
        });
        this.setState({Friends: friends});
        // user-id and friend-id
        axios({
            method: "delete",
            url: "friends",
            data: {
                friend: friend_id
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    render() {
        const {Friends, error} = this.state;
        const friendsView = Friends.length ? Friends.map(friend =>
            <tr key={friend._id}>
                <th>
                    <img src="" alt="image"/>
                    <span>{friend.name}</span>
                    <span>{friend.email}</span>
                    <span><Button onClick={() => this.handleUnFriend(friend._id)}>UnFriend</Button></span>
                </th>
            </tr>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;
        return (
            <div className="FriendsPage">
                <h1>Friends</h1>
                <Add addType="Your Friend Email" inputType="email" type="Friends"/>
                <Table>
                    <thead>
                    <tr>
                        <th>Friends</th>
                    </tr>
                    </thead>
                    <tbody>
                    {friendsView}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default FriendsPage;
