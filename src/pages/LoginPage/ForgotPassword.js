import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import './login.css';

class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      showError: false,
      messageFromServer: '',
      showNullError: false,
    };
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendEmail = (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
      axios
        .post('http://localhost:3000/forgotPassword', {
          email,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data === 'recovery email sent') {
            this.setState({
              showError: false,
              messageFromServer: 'recovery email sent',
              showNullError: false,
            });
          }
        })
        .catch((error) => {
          console.error(error.response.data);
          if (error.response.data === 'email not in db') {
            this.setState({
              showError: true,
              messageFromServer: '',
              showNullError: false,
            });
          }
        });
    }
  };

  render() {
    const {email} = this.state;

    return (
         <Form onSubmit={this.sendEmail}>
        <FormGroup className="resetemailinput">
          <Label className="emailresetlabel" for="Email">Email</Label>
          <Input type="email" name="email" id="Email" 
          value={email}
          onChange={this.handleChange('email')}
          placeholder="Enter Your email address" />
        </FormGroup>
        <Button className="resetpasswordbutton col-md-2 btn-success"> Reset Password</Button>
      </Form>       
    );
  }
}

export default ForgotPassword;
