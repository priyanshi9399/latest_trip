import * as React from "react";
import TextField from "@material-ui/core/TextField";
import DateRangePicker from "@material-ui/lab/DateRangePicker";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import Box from "@material-ui/core/Box";

export default function BasicDateRangePicker(props) {
  const { value } = props;
  const { onChange } = props;

  const startDate = new Date(value.startDate);
  const endDate = new Date(value.endDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        startText="Start Date"
        endText="End Date"
        value={[startDate, endDate]}
        maxDate={new Date()}
        onChange={(newValue) => {
          onChange(newValue);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} variant="filled" />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} variant="filled" />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}
