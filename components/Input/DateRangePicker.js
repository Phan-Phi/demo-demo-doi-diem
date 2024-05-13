import { useCallback, useRef } from "react";
import { Calendar } from "react-date-range";
import { Box, Popover, Stack, TextField, styled } from "@mui/material";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useToggle } from "hooks/useToggle";
import { formatDate } from "libs";

const DateRangePicker = ({ label, onChange, value }) => {
  const anchorRef = useRef();

  const { open, onOpen, onClose } = useToggle();

  const handleSelect = useCallback(
    (range) => {
      onChange(formatDate(range, "dd/MM/yyyy"));
    },
    [onChange]
  );

  return (
    <Stack spacing={1}>
      <Box onClick={onOpen}>
        <StyledInputBase
          label={label}
          InputLabelProps={{
            shrink: !!value,
          }}
          fullWidth
          value={value}
        />
      </Box>

      <Box ref={anchorRef} />
      <Popover
        open={open}
        onClose={onClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Calendar date={new Date()} onChange={handleSelect} />
      </Popover>
    </Stack>
  );
};

const StyledInputBase = styled(TextField)(() => {
  return {
    pointerEvents: "none",
  };
});

export default DateRangePicker;
