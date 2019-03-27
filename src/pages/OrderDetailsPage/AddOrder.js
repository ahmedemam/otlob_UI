import React, { Component } from "react";
import { Table, Form, Button } from "react-bootstrap";

class addOrder extends Component {
  state = {
    person: "Mostafa",
    item: "",
    amount: "",
    price: "",
    comment: ""
  };

  //! inputs change handler
  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  //! add new order
  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.addOrder(this.state);
    this.setState({
      item: "",
      amount: "",
      price: "",
      comment: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
        <Table bordered>
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="item"
                    onChange={this.changeHandler}
                    value={this.state.item}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <input
                    type="number"
                    className="form-control amount"
                    id="amount"
                    onChange={this.changeHandler}
                    value={this.state.amount}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <input
                    type="number"
                    className="form-control price"
                    id="price"
                    onChange={this.changeHandler}
                    value={this.state.price}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Control
                    type="text"
                    id="comment"
                    onChange={this.changeHandler}
                    value={this.state.comment}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Button type="submit" variant="success">
                    Add
                  </Button>
                </Form.Group>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    );
  }
}

export default addOrder;
