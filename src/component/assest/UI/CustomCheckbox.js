import * as React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CustomCheckbox = (props) => {
  const { label, toggleCheckboxChange, name, checked, value } = props;
  const _onChange = (e) => {
    const { name, checked, value } = e.target;
    toggleCheckboxChange(name, checked, value);
  };
  return (
    <FormControlLabel
      value={value}
      control={<Checkbox checked={checked} onChange={_onChange} name={name} />}
      label={label}
      labelPlacement="end"
    />
  );
};

export default CustomCheckbox;
