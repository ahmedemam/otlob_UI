import React, { Component } from "react";
import axios from "axios";
import { Container, Row, Col, ButtonToolbar, Button } from "react-bootstrap";
import "./OrderDetails.scss";
//! components
import Modal from "../../components/Modal/Modal";
import Friend from "../../components/Modal/friend";
import OrdersTable from "./OrdersTable";
import AddOrder from "./AddOrder";

class orderDetailsPage extends Component {
  state = {
    modalShow: false,
    joinedNum: 5,
    invitedNum: 10,
    joinedFriends: [],
    invitedFriends: [],
    allOrders: [
      {
        id: "1",
        person: "Mostafa",
        item: "Ta3mia",
        amount: 2,
        price: 1.5,
        comment: "Bel Salata"
      },
      {
        id: "2",
        person: "Ali",
        item: "Frites",
        amount: 5,
        price: 1.5,
        comment: "Bel Salata"
      },
      {
        id: "3",
        person: "Ahmed",
        item: "Fool",
        amount: 4,
        price: 1.5,
        comment: "Bel Salata"
      }
    ],
    error: false
  };

  //! get orders
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(res => {
        const posts = res.data.slice(0, 4);
        // const updated = posts.map(post => {
        //   return { ...post, author: "mostafa" };
        // });
        this.setState({ joinedFriends: posts });
        // console.log(res);
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  //! delete order
  deleteOrderHandler = orderId => {
    console.log(orderId);
    let orders = this.state.allOrders.filter(order => {
      return order.id !== orderId;
    });
    this.setState({ allOrders: orders });
  };

  //! add new order
  addOrderHandler = newOrder => {
    newOrder.id = Math.random();
    let orders = this.state.allOrders;
    orders.push(newOrder);
    this.setState({
      allOrders: orders
    });

    //*-----------
    axios
      .post("/", {
        params: {
          person: "Mostafa",
          item: newOrder.item,
          amount: newOrder.amount,
          price: newOrder.price,
          comment: newOrder.comment
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    //*-----------
  };

  render() {
    //! ===================================================================
    let friends = (
      <p style={{ textAlign: "center" }}>Something Went Wrong with server</p>
    );
    if (!this.state.error) {
      friends = this.state.joinedFriends.map(friend => {
        return (
          <Friend key={friend.id} title={friend.title} body={friend.body} />
        );
      });
      // console.log("frineds", friends);
    }
    let modalClose = () => this.setState({ modalShow: false });
    //! ===================================================================

    return (
      <main className="main-padding order-details">
        <Container>
          <h1 className="main-title">Order Details</h1>
          <section>
            <Row className="order-details__table">
              {/* //! allOrders */}
              <Col sm={8}>
                <OrdersTable
                  allOrders={[...this.state.allOrders]}
                  deleteOrder={this.deleteOrderHandler}
                />
              </Col>
              {/* //! modals */}
              <Col sm={4} className="align-self-center">
                <div className="order-details__modal">
                  <ButtonToolbar>
                    <Button
                      variant="primary"
                      onClick={() => this.setState({ modalShow: true })}
                    >
                      <span>{this.state.invitedNum} </span>
                      Friends invited, Click to view
                    </Button>
                    <Modal
                      show={this.state.modalShow}
                      onHide={modalClose}
                      friendsType="Invited"
                    />
                  </ButtonToolbar>
                </div>

                <div className="order-details__modal">
                  <ButtonToolbar>
                    <Button
                      variant="primary"
                      onClick={() => this.setState({ modalShow: true })}
                    >
                      <span>{this.state.joinedNum} </span>
                      Friends Joined, Click to view
                    </Button>
                    <Modal
                      show={this.state.modalShow}
                      onHide={modalClose}
                      joined={friends}
                      friendsType="Joined"
                    />
                  </ButtonToolbar>
                </div>
              </Col>
              {/* <Col>{friends}</Col> */}
            </Row>
          </section>
          {/* //! add Item to Orders */}
          <section className="order-details__add">
            <AddOrder addOrder={this.addOrderHandler} />
          </section>
        </Container>
      </main>
    );
  }
}

export default orderDetailsPage;
