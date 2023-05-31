import { styled } from "@mui/material/styles";
import Input from "@mui/material/Input";

export const InputCustom = styled(Input)(() => ({
  textTransform: "none",
  height: "48px",
  fontWeight: "400",
  padding: "16px 8px",
  borderRadius: "6px",
  backgroundColor: "rgb(241,243,245)",
  color: "rgba(0, 0, 0, 0.85)",
  "&.Mui-focused": {
    backgroundColor: "rgba(0, 0, 0, 0.06)"
  },
  "&.numeric-input": {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none"
    }
  },
  "&.Mui-error": {
    backgroundColor: "rgb(255, 239, 239)",
    border: "1px solid rgb(243, 174, 175)"
  }
}));
