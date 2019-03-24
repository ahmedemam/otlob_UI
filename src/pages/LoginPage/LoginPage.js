//import styles from "LoginPage.module"
//className={styles.App}
import React from 'react';
import ReactDOM from 'react-dom';
import './login.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Button} from 'reactstrap';
const ReactCSSTG =ReactCSSTransitionGroup;


// Main app
 export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isVisible: true
      }
      // Bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRemount = this.handleRemount.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isVisible: false
    }, function() {
      console.log(this.state.isVisible)
    });
    return false;
  }
  handleRemount(e) {
    this.setState({
      isVisible: true
    }, function() {
      console.log(this.state.isVisible)
    });
    e.preventDefault();
  }
  render() {

    // const for React CSS transition declaration
    let component = this.state.isVisible ? <Modal onSubmit={ this.handleSubmit } key='modal'/> : <ModalBack onClick={ this.handleRemount } key='bringitback'/>;
    return <ReactCSSTG transitionName="animation" transitionAppear={true} transitionAppearTimeout={500} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
             { component }
           </ReactCSSTG>
  }
}

// Modal
class Modal extends React.Component {
  render() {
    //return <div className={styles.Modal} >
    return <div className="Modal" >
    <div className= 'row'>
            <div className='col-lg-11 col-md-11 col-sm-11 col-xs-11 cola '>
    
              <Logo />
              <form onSubmit= { this.props.onSubmit }>
              <div className='col-md-4'>
                <input className="widthfifth" type='text' name='username' placeholder='Enter Your username' />
                <input className="widthfifth" type='password' name='password' placeholder='Enter Your password' />
                </div>
                
                <Button className="signinbutton col-md-4"> Sign In</Button>
              </form>
              <div className='social-signin'>
                <Button className="fb" onClick={ this.props.onClick }><i className="fa fa-facebook" aria-hidden="true">FaceBook</i></Button>
                <Button className="tw" onClick={ this.props.onClick }><i className="fa fa-gmail" aria-hidden="true">Gmail</i></Button>
              </div>
                <a href='/forgetpassword'>forget your password ?</a>
           </div>
           </div>
           </div>
  }
}

/*
// Generic input field
class Input extends React.Component{
  render() {
    return <div className='Input'>
              <input type={ this.props.type } name={ this.props.name } placeholder={ this.props.placeholder } required autocomplete='false'/>
              <label for={ this.props.name } ></label>
           </div>
  }
}
*/

// Fake logo
class Logo extends React.Component {
  render() {
    return <div className="logo">
                <span> Sign In </span>
              </div>
  }
}

// Button to brind the modal back
class ModalBack extends React.Component {
  render() {
    return <Button className="bringitback" onClick={ this.props.onClick } key={ this.props.className }>Brind the modal back !</Button>
  }
}

ReactDOM.render(<App />, document.getElementById('root'));