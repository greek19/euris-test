import React from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ show, onHide, title, children, footer }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {/* Aggiungiamo i bottoni come footer */}
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
