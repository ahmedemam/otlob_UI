import React from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
// import Cookies from "universal-cookie";
import "./register.css";

function SignUpUser(data) {
  console.log(JSON.stringify(data));
  return fetch("http://localhost:4000/users/signup/", {
    body: JSON.stringify(data),
    method: "POST",
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .catch(error => {
      console.log("Error while sending data !");
    });
}

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    this.hundleSignUp = this.hundleSignUp.bind(this);
  }

  //componentDidMount() {
  //let cookies = new Cookies();
  // if (cookies.get('token'))
  //   window.location = "http://localhost:3000/";

  //}

  handleUpdateFirstName = event => {
    console.log(event.target.value);
    this.setState({
      firstName: event.target.value
    });
  };
  handleUpdateLastName = event => {
    console.log(event.target.value);
    this.setState({
      lastName: event.target.value
    });
  };
  handleUpdateEmail = event => {
    console.log(event.target.value);
    this.setState({
      email: event.target.value
    });
  };
  handleUpdatePassword = event => {
    console.log(event.target.value);
    this.setState({
      password: event.target.value
    });
  };

  hundleSignUp() {
    SignUpUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }).then(data => {
      console.log(data);
      if (data.email === "Email already exists")
        alert("Email is already exists");
      else if (data.firstName.msg)
        alert("Error in first name enter 3 to 8 character length");
      else if (data.lastName.msg)
        alert("Error in first name enter 3 to 8 character length");
      else alert("sign up successfully please login");
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <center>
          <div className="row">
            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-11 cola " />

            <div className="col-lg-3 " />
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 ">
              <h4>Registeration Page</h4>
              <hr />
              <Form className="registerationform">
                <FormGroup>
                  <Input
                    type="name"
                    name="fname"
                    placeholder="First name"
                    value={this.state.firstName}
                    pattern="[A-Za-z\\s]*"
                    onChange={this.handleUpdateFirstName}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="name"
                    name="lname"
                    placeholder="Last name"
                    value={this.state.lastName}
                    pattern="[A-Za-z\\s]*"
                    onChange={this.handleUpdateLastName}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={this.state.email}
                    onChange={this.handleUpdateEmail}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    placeholder="password "
                    value={this.state.password}
                    onChange={this.handleUpdatePassword}
                  />
                </FormGroup>

                <Button
                  className="col-lg-12 btn-success"
                  onClick={this.hundleSignUp}
                >
                  {" "}
                  Sign up
                </Button>
              </Form>
            </div>
          </div>
        </center>
      </div>
    );
  }
}

export default RegistrationForm;
