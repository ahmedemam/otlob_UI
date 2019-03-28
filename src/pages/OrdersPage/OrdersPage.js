import React, {Component} from "react";
import axios from "axios";
import {Table, Button, Alert, ModalHeader, ModalBody, ModalFooter, Modal, Input} from "react-bootstrap";
import {Redirect, Link} from 'react-router-dom'


class OrdersPage extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        user: {},
        orders: []
    };

    componentDidMount() {
        axios.get('/user', {
            param: {
                user_id: ""
            }
        }).then(function (response) {
            console.log(response);
            const orders = response.data;
            this.setState({orders: orders});
        }).catch(function (error) {
            console.log(error);
        });
    }


    handleCancelOrder = (orderId) => {
        axios.delete("/order", {
            params: {
                user_id: this.state.user._id,
                order_id: orderId
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

        const orders = this.state.orders.filter(order => {
            return order._id !== orderId;
        });

        this.setState({orders: orders});
    };

    handleFinishOrder = (orderId) => {
        axios.put("/orders", {
            params: {
                user_id: this.state.user._id,
                order_id: orderId,
                status: "finish"
            }
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

        const orders = this.state.orders.map(order => {
            if (order._id === orderId) {
                order.status = "Finish"
            }
        });

        this.setState({orders: orders});
    };

    handleViewOrder = orderId => {

    };

    // handle view
    // handle Invited
    // handle Joined

    render() {

        const {orders, error} = this.state;
        const ordersView = orders.length ? orders.map(order =>
            <tr key={order._id}>
                <td>{order.meal}</td>
                <td>{order.restaurantName}</td>
                <td>{order.status}</td>
                <td>{order.invitedPeople}</td>
                <td>{order.joinedPerople}</td>
                <td>
                    <Button color='danger' onClick={() => this.handleCancelOrder(order._id)}>Cancel</Button>
                    <Button color='success' onClick={() => this.handleFinishOrder(order_id)}>Finish</Button>
                    <Link to="/order-details" id={order._id}/>
                </td>
            </tr>
        ) : error ? <h1><Alert color='danger'>{error}</Alert></h1> : null;
        return (
            <div>
                <h1>Order Controller</h1>
                <Link to="/add-order" id={this.state.user._id}/>
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
                    <tbody>
                    {ordersView}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ordersPage;
