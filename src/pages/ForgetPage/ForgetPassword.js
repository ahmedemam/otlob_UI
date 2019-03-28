import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label, Col } from "reactstrap";
import axios from "axios";

class ForgetPassword extends Component {
  state = {
    name: "",
    email: "",
    newPassword: "",
    confirm: ""
  };

  //! inputs change handler
  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    console.log(e.target.value);
  };

  //! submit handler
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.newPassword === this.state.confirm) {
      axios
        .post("/", {
          params: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.newPassword,
            confirm: this.state.confirm
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("error");
    }
  };

  render() {
    return (
      <main className="container main-padding">
        <div className="row">
          <div className="col-sm-8 offset-sm-2">
            <h1 className="main-title text-center">Forgot password</h1>
            <hr />
            <Form className="registerationform" onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label for="name" sm={4}>
                  Confirm Your Username
                </Label>
                <Col sm={8}>
                  <Input
                    id="name"
                    type="name"
                    name="fname"
                    placeholder="User Name"
                    value={this.state.firstName}
                    pattern="[A-Za-z\\s]*"
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="name" sm={4}>
                  confirm your Email
                </Label>
                <Col sm={8}>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={this.state.email}
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="name" sm={4}>
                  New Password
                </Label>
                <Col sm={8}>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="password "
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="name" sm={4}>
                  Confirm New Password
                </Label>
                <Col sm={8}>
                  <Input
                    id="confirm"
                    type="password"
                    name="confirm"
                    placeholder="confirm password "
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row className="text-center">
                <Button className="col-sm-2 btn-success">Submit</Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </main>
    );
  }
}

export default ForgetPassword;
