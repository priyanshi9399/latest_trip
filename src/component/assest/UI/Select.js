import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import MenuItem from "@material-ui/core/MenuItem";

/**
 * @author
 * @function Select
 **/

const CustomSelect = (props) => {
  const { value, name, onInputChange, menuList, label } = props;

  const _onChange = (e) => {
    const { name, value } = e.target;

    onInputChange(name, value);
  };

  return (
    <>
      <FormControl variant="filled" sx={{ m: 1, minWidth: 320 }}>
        <InputLabel id="demo-simple-select-filled-label">
          {/*  */}
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={value}
          onChange={_onChange}
          name={name}
        >
          {menuList.map((item) => (
            <MenuItem value={item.value}>{item.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CustomSelect;
