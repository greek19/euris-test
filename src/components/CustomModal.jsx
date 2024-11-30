import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";

CustomModal.propTypes = {
  show: PropTypes.boolean.isRequired,
  onHide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  footer: PropTypes.any.isRequired

}

const CustomModal = ({ show, onHide, title, children, footer }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-scrollable text-break">
        {children}
      </Modal.Body>
      <Modal.Footer>{footer}</Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
