import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * @author
 * @function CustomModal
 **/

export const CongratulationModal = (props) => {
  const { show, handleClose } = props;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Congratulations</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="unique-button" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
