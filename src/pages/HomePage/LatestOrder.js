import React, { Component } from "react";
import axios from "axios";
import { Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LatestOrder.css";

class LatestOrder extends Component {
  // constructor(props) {
  //   super(props);

  //   const currentUser = JSON.parse(localStorage.getItem("current-user"));
  //   this.state = {
  //     user: currentUser,
  //     Orders: []
  //   };
  // }
  state = {
    Orders: [],
    user: ""
  };

  componentWillMount() {
    const currentUser = JSON.parse(localStorage.getItem("current-user"));
    this.setState({
      user: currentUser
    });
  }

  componentDidMount() {
    console.log("DID MOUNT", this.state.user);
    // get groups
    axios
      .get(`http://localhost:3000/v1/user/${this.state.user._id.$oid}/order`)
      .then(response => {
        console.log(response.data);
        this.setState({ Orders: response.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { Orders, error } = this.state;
    const ordersView = Orders.length ? (
      Orders.map(order => (
        <tr key={order._id.$oid}>
          <td>
            <Link id={order._id.$oid} to="/order-details">
              {order.name} on {order.created_at}
            </Link>
          </td>
        </tr>
      ))
    ) : error ? (
      <h1>
        <Alert color="danger">{error}</Alert>
      </h1>
    ) : null;

    return (
      <div className="LatestOrder">
        <Table>
          <thead>
            <tr>
              <th>Latest Order</th>
            </tr>
          </thead>
          <tbody>{ordersView}</tbody>
        </Table>
      </div>
    );
  }
}

export default LatestOrder;
