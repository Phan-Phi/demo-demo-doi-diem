import { parseISO, format } from "date-fns";

export const formatDate = (value, formatOption = "dd/MM/yyyy - HH:mm:ss") => {
  if (value == undefined) {
    return value;
  }

  if (typeof value === "string") {
    value = parseISO(value);
  }

  return format(value, formatOption);
};
