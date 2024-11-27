import React from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ show, onHide, title, children, footer }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
        {children}
      </Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
