import { TextField, styled } from "@mui/material";

export default function TaxID({ value, error, onChange, ref, label }) {
  return (
    <StyledTextField
      type="number"
      value={value}
      label={label}
      onChange={onChange}
      inputRef={ref}
      error={error}
    />
  );
}

const StyledTextField = styled(TextField)(() => {
  return {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
  };
});
