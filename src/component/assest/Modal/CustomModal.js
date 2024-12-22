import React from "react";
import { Modal, Button } from "react-bootstrap";
import isEmpty from "is-empty";
import "./Custom-modal.css";

/**
 * @author
 * @function CustomModal
 **/

export const CustomModal = (props) => {
  const {
    show,
    handleClose,
    onSubmit,
    title,
    isError,
    fromSettel,
    settelmentData,
    isRollback,
  } = props;
  return (
    <>
      <Modal show={show} onHide={handleClose} className="custom-modal">
      {title &&
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      }
        <Modal.Body>{props.children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="unique-button" onClick={handleClose}>
            Close
          </Button>
          <Button
             className="unique-button"
             variant="primary"
            onClick={onSubmit}
            disabled={
              isError
                ? true
                : fromSettel && isEmpty(settelmentData.comment) && !isRollback
                ? true
                : false
            }
           
          >
            {isRollback ? "Join" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
