import { styled } from "@mui/material/styles";
import { Autocomplete } from "@mui/material";

export const AutoCompleteCustom = styled(Autocomplete)(() => ({
  width: "308px",
  maxHeight: "300px",
  backgroundColor: "rgb(241, 243, 245)",
  borderRadius: "8px",
  fontSize: "16px",
  marginBottom: "4px",
  "& .MuiAutocomplete-inputRoot": {
    padding: "8px",
    "& input": {
      fontSize: "16px",
      lineHeight: "16px"
    }
  },
  "& .MuiAutocomplete-listbox": {
    backgroundColor: "red",
    "& .MuiAutocomplete-option": {
      backgroundColor: "red"
    }
  },
  "&.Mui-focused": {
    backgroundColor: "rgba(0, 0, 0, 0.06)"
  },
  "& .MuiAutocomplete-tag": {
    color: "rgb(0, 145, 255)",
    backgroundColor: "#fff",
    borderRadius: "6px",
    fontSize: "14px",
    lineHeight: "16px",
    margin: "2px",
    padding: "4px"
  },
  "& .MuiAutocomplete-listbox [aria-selected='true']": {
    backgroundColor: "red !important"
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "none"
  },
  "& .MuiFormControl-root-MuiTextField-root": {
    marginTop: "0"
  },

  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']": {
    backgroundColor: "#e9f9ee",
    color: "#30a46c"
  }
}));
