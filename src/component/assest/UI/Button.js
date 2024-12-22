import React from "react";

/**
 * @author
 * @function Button
 **/

const Button = (props) => {
  return (
    <>
      <button {...props}>{props.children}</button>
    </>
  );
};

export default Button;
