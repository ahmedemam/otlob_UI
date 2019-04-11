import React from "react";
import { Button, Form, FormGroup, Input, Label, Col } from "reactstrap";
// import Cookies from "universal-cookie";
import "./register.css";
import axios from "axios";

// function SignUpUser(data) {
//   console.log(JSON.stringify(data));
//   return fetch("http://localhost:4000/users/signup/", {
//     body: JSON.stringify(data),
//     method: "POST",
//     headers: { "Content-Type": "application/json" }
//   })
//     .then(response => response.json())
//     .catch(error => {
//       console.log("Error while sending data !");
//     });
// }

class RegistrationForm extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: ""
  };

  //! inputs change handler
  changeHandler = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
    // console.log(e.target.value);
  };

  //componentDidMount() {
  //let cookies = new Cookies();
  // if (cookies.get('token'))
  //   window.location = "http://localhost:3000/";
  //}

  // hundleSignUp = () => {
  //   SignUpUser({
  //     name: this.state.name,
  //     email: this.state.email,
  //     password: this.state.password
  //   }).then(data => {
  //     console.log(data);
  //     if (data.email === "Email already exists")
  //       alert("Email is already exists");
  //     else if (data.firstName.msg)
  //       alert("Error in first name enter 3 to 8 character length");
  //     else alert("sign up successfully please login");
  //   });
  // }

  //! submit handler
  handleSignUp = e => {
    e.preventDefault();
    // const obj =
    if (this.state.password === this.state.confirm) {
      axios
        .post("http://localhost:3000/v1/user", {
          // params: {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
          // confirm: this.state.confirm
          // }
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
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
            <h1 className="main-title text-center">Registeration</h1>
            <hr />
            <Form className="registerationform" onSubmit={this.handleSignUp}>
              <FormGroup row>
                <Label for="name" sm={3}>
                  Name
                </Label>
                <Col sm={9}>
                  <Input
                    id="name"
                    type="name"
                    name="fname"
                    placeholder="User Name"
                    value={this.state.firstName}
                    // pattern="[A-Za-z\\s]*"
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="name" sm={3}>
                  Email
                </Label>
                <Col sm={9}>
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
                <Label for="name" sm={3}>
                  Password
                </Label>
                <Col sm={9}>
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
                <Label for="name" sm={3}>
                  Confirm Password
                </Label>
                <Col sm={9}>
                  <Input
                    id="confirm"
                    type="password"
                    name="confirm"
                    placeholder="confirm password "
                    onChange={this.changeHandler}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Button className="col-sm-2 btn-success">Register</Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      </main>
    );
  }
}

export default RegistrationForm;
