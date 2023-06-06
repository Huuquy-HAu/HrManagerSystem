import { styled } from "@mui/material/styles";

export const TextAreaCustom = styled("textarea")(({}) => ({
    width: '100%',
    flexGrow: 1,
    boxSizing: "border-box",
    borderRadius: 8,
    backgroundColor: "#f1f3f5",
    resize: "none",
    marginBottom: "8px",
    padding: 16,
  
    "&:focus": {
      backgroundColor: "rgba(0, 0, 0, 0.06)",
      border: "none",
      outline: "none"
    }
  }));