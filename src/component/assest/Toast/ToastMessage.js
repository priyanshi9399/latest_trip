import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";



export default function ToastMessage(props){

  const { show, close, message, type, title } = props;
  return (
    <>
      <ToastContainer position="top-end" className="p-3">
        <Toast show={show} onClose={close} bg={type.toLowerCase()}>
          <Toast.Header>{title}</Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );

}
