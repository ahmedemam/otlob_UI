import React, { Component } from "react";
import axios from "axios";
import { Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LatestOrder.css";

class LatestOrder extends Component {
  state = {
    Orders: []
  };

  componentDidMount() {
    // get groups
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function(response) {
        console.log(response);
        this.setState({ Orders: response.data });
      })
      .catch(function(error) {
        console.error(error);
      });
  }

  render() {
    const { Orders, error } = this.state;
    const ordersView = Orders.length ? (
      Orders.map(order => (
        <tr key={order._id}>
          <Link id={order._id} to="/order-details">
            {order.name} on {order.createdAt}
          </Link>
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
