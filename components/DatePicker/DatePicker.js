import React from "react";
import { Controller } from "react-hook-form";

import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export default function DatePicker(props) {
  const { control, name, label } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={(props) => {
        const {
          field: { ref, onChange, value },
          fieldState: { error },
        } = props;

        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
              {...{
                value,
                onChange,
                inputRef: ref,
                inputFormat: "dd/MM/yyyy",
                renderInput: (params) => {
                  return (
                    <TextField
                      {...params}
                      label={label}
                      error={!!error}
                      helperText={!!error && error.message}
                    />
                  );
                },
              }}
            />
          </LocalizationProvider>
        );
      }}
    />
  );
}
