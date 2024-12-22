import React from "react";

/**
 * @author
 * @function Input
 **/

const Input = (props) => {
  const { type, value, onInputChange, name, label, placeholder, onBlur } =
    props;

  const _onChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  return (
    <>
      <p>{label}</p>
      <div className="money-exch-input">
        <input
          type={type}
          value={value}
          onChange={_onChange}
          name={name}
          placeholder={placeholder}
          onBlur={onBlur}
        />
      </div>
    </>
  );
};

export default Input;
