import React, { Component } from "react";
// import ReactDOM from "react-dom";
import "./login.scss";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
// import NavLink from "react-bootstrap/NavLink";
import { Link } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: ""
    // remember: ""
  };

  //! inputs change handler
  // changeHandler = e => {
  //   this.setState({
  //     [e.target.id]: e.target.value
  //   });
  //   console.log(e.target.value);
  // };

  emailChangeHandler = event => {
    this.setState({ email: event.target.value });
    console.log(this.state.email);
  };

  passwordChangeHandler = event => {
    this.setState({ password: event.target.value });
    console.log(this.state.password);
  };

  //! remember me Handler
  // rememberHandler = e => {
  //   this.setState({
  //     remember: e.target.checked
  //   });
  //   console.log(e.target.checked);
  // };

  //! submit handler
  submitHandler = e => {
    e.preventDefault();
    //*-----------
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("http://localhost:3000/v1/session", user)
      .then(res => {
        console.log(res.data);
        // console.log(res.data.name);
        const user = res.data;
        if (res.status === 201) {
          const currentUser = JSON.stringify(user);
          localStorage.setItem("current-user", currentUser);
          console.log("LOGIN", localStorage.getItem("current-user"));
          // console.log(currentUser);
          this.props.history.push("/");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <main className="main-padding login">
        <Container>
          <h1 className="text-center main-title">Yalla Notlob</h1>
          {/* //! login form */}
          <Form onSubmit={this.submitHandler}>
            <Form.Group as={Row}>
              <Form.Label column sm={{ span: 2, offset: 2 }}>
                Email
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  id="email"
                  onChange={this.emailChangeHandler}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={{ span: 2, offset: 2 }}>
                Password
              </Form.Label>
              <Col sm={6}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  id="password"
                  onChange={this.passwordChangeHandler}
                />
              </Col>
            </Form.Group>
            {/* <Form.Group as={Row} controlId="formHorizontalCheck">
              <Col sm={{ span: 6, offset: 4 }}>
                <Form.Check
                  label="Remember me"
                  id="remember"
                  onChange={this.rememberHandler}
                />
              </Col>
            </Form.Group> */}

            <Form.Group as={Row}>
              <Col sm={{ span: 2, offset: 5 }} className="text-center">
                <Button type="submit">Login</Button>
              </Col>
            </Form.Group>
          </Form>

          {/* //! Register || forget password */}
          <div className="login__register">
            <Form.Group as={Row}>
              <Col sm={{ span: 4, offset: 4 }} className="text-center">
                <Link to="/register">New user? Register Here</Link>
              </Col>
            </Form.Group>
            <Form.Group>
              <Col sm={{ span: 4, offset: 4 }} className="text-center">
                <Link to="/forgotPassword">Forget your Password</Link>
              </Col>
            </Form.Group>
          </div>

          {/* //! facebook && Google */}
          <div className="login__third">
            <Form.Group as={Row}>
              <Col sm={{ span: 4, offset: 4 }} className="text-center">
                <Button className="btn btn-facebook">
                  Login with facebook
                </Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 4, offset: 4 }} className="text-center">
                <Button className="btn btn-google">Login with Google</Button>
              </Col>
            </Form.Group>
          </div>
        </Container>
      </main>
    );
  }
}

export default Login;

// import ReactCSSTransitionGroup from "react-addons-css-transition-group";
// import {Button,Modal,ModalBlack} from "reactstrap";
//
// const ReactCSSTG = ReactCSSTransitionGroup;
//
// // Main app
// export default class App extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isVisible: true
//         };
//         // Bindings
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleRemount = this.handleRemount.bind(this);
//     }
//
//     handleSubmit(e) {
//         e.preventDefault();
//         this.setState({
//             isVisible: false
//         }, function () {
//             console.log(this.state.isVisible)
//         });
//         return false;
//     }
//
//     handleRemount(e) {
//         this.setState({
//             isVisible: true
//         }, function () {
//             console.log(this.state.isVisible)
//         });
//         e.preventDefault();
//     }
//
//     render() {
//
//         return (
//             <div>
//             {/*    // const for React CSS transition declaration*/}
//             {/*    let component = this.state.isVisible ? <Modal onSubmit={this.handleSubmit} key='modal'/> :*/}
//             {/*    <ModalBack onClick={this.handleRemount} key='bringitback'/>;*/}
//             {/*    return <ReactCSSTG transitionName="animation" transitionAppear={true} transitionAppearTimeout={500}*/}
//             {/*                       transitionEnterTimeout={500} transitionLeaveTimeout={300}>*/}
//             {/*    {component}*/}
//             {/*</ReactCSSTG>*/}
//             </div>
//         );
//     }
// }
//
// // // Modal
// // class Modal extends React.Component {
// //     render() {
// //         //return <div className={styles.Modal} >
// //         return <div className="Modal">
// //             <div className='row'>
// //                 <div className='col-lg-11 col-md-11 col-sm-11 col-xs-11 cola '>
// //                     <Logo/>
// //                     <form onSubmit={this.props.onSubmit}>
// //                         <div className='col-md-4'>
// //                             <input className="widthfifth" type='text' name='username'
// //                                    placeholder='Enter Your username'/>
// //                             <input className="widthfifth" type='password' name='password'
// //                                    placeholder='Enter Your password'/>
// //                         </div>
// //
// //                         <Button className="signinbutton col-md-4"> Sign In</Button>
// //                     </form>
// //                     <div className='social-signin'>
// //                         <Button className="fb" onClick={this.props.onClick}><i className="fa fa-facebook"
// //                                                                                aria-hidden="true">FaceBook</i></Button>
// //                         <Button className="tw" onClick={this.props.onClick}><i className="fa fa-gmail"
// //                                                                                aria-hidden="true">Gmail</i></Button>
// //                     </div>
// //                     <a href='/pages/LoginPage/ForgotPassword.js'>forget your password ?</a>
// //                 </div>
// //             </div>
// //         </div>
// //     }
// // }
