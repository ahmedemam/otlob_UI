import React from "react";

import { Table } from "react-bootstrap";

//! components
// import OrderItem from "./OrderItem";

const Orderstable = props => {
  //! ======================================================================
  // const orderDetails = props.orderDetails;
  let ordersLength = props.allOrders.length;

  const listOrders = ordersLength ? (
    props.allOrders.map(order => {
      // console.log(ordersLength);
      return (
        <tr key={order.id}>
          <td>{order.person}</td>
          <td>{order.item}</td>
          <td>{order.amount}</td>
          <td>{order.price}</td>
          <td>{order.comment}</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => props.deleteOrder(order.id)}
            >
              X
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="6">
        <h3>There are No Orders yet</h3>
      </td>
    </tr>
  );
  //! ======================================================================

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Person</th>
          <th>Item</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Comment</th>
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {/* {props.orderDetails.map(order => {
          return (
            <OrderItem
              key={order.id}
              person={order.person}
              item={order.item}
              amount={order.amount}
              price={order.price}
              comment={order.comment}
            />
          );
        })} */}
        {listOrders}
      </tbody>
    </Table>
  );
};

export default Orderstable;
