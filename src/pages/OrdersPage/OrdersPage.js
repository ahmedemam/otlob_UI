import React from "react";
import axios from "axios";
import { Table, Button, Alert, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class OrdersPage extends React.Component {
  state = {
    user: {},
    orders: []
  };

  componentDidMount() {
    axios
      .get("/user", {
        param: {
          user_id: ""
        }
      })
      .then(function(response) {
        console.log(response);
        const orders = response.data;
        this.setState({ orders: orders });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleCancelOrder = orderId => {
    axios
      .delete("/order", {
        params: {
          user_id: this.state.user._id,
          order_id: orderId
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    const orders = this.state.orders.filter(order => {
      return order._id !== orderId;
    });

    this.setState({ orders: orders });
  };

  handleFinishOrder = orderId => {
    axios
      .put("/orders", {
        params: {
          user_id: this.state.user._id,
          order_id: orderId,
          status: "finish"
        }
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });

    const orders = this.state.orders.map(order => {
      return order._id === orderId ? (order.status = "Finish") : order.status;
    });

    this.setState({ orders: orders });
  };

  handleViewOrder = orderId => {};

  // handle view
  // handle Invited
  // handle Joined

  render() {
    const { orders, error } = this.state;
    const ordersView = orders.length ? (
      orders.map(order => (
        <tr key={order._id}>
          <td>{order.meal}</td>
          <td>{order.restaurantName}</td>
          <td>{order.status}</td>
          <td>{order.invitedPeople}</td>
          <td>{order.joinedPerople}</td>
          <td>
            <Button
              color="danger"
              onClick={() => this.handleCancelOrder(order._id)}
            >
              Cancel
            </Button>
            <Button
              color="success"
              onClick={() => this.handleFinishOrder(order._id)}
            >
              Finish
            </Button>
            <Link to="/order-details" id={order._id} />
          </td>
        </tr>
      ))
    ) : error ? (
      <h1>
        <Alert color="danger">{error}</Alert>
      </h1>
    ) : null;
    return (
      <main className="main-padding">
        <Container>
          <h1 className="main-title">Order Controller</h1>
          <Link to="/add-order" id={this.state.user._id} />
          <Table>
            <thead>
              <tr>
                <th>OrderName</th>
                <th>Restaurant</th>
                <th>Invited</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{ordersView}</tbody>
          </Table>
        </Container>
      </main>
    );
  }
}

export default OrdersPage;
