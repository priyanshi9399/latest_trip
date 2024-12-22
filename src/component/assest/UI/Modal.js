import React from "react";
import { Modal } from "react-bootstrap";

/**
 * @author
 * @function CustomModal
 **/

const CustomModal = (props) => {
  const { title, onShow, onClose, centered, size } = props;
  return (
    <>
      <Modal show={onShow} onHide={onClose} centered={centered} size={size}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
      </Modal>
    </>
  );
};

export default CustomModal;
