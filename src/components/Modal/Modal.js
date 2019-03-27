import React from "react";
import { Modal, Row } from "react-bootstrap";

//! components
import "./friend.scss";

class MyVerticallyCenteredModal extends React.Component {
  // state = {
  //   friendsNum: "",
  //   friends: [{}, {}]
  // };

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <span>{this.props.friendsType}</span> Friends
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>{this.props.joined}</Row>
        </Modal.Body>
      </Modal>
    );
  }
}

export default MyVerticallyCenteredModal;
