import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";

export const CustomTabMui = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontSize: "14px",
  fontWeight: "400",
  marginRight: theme.spacing(1),

  color: "rgba(0, 0, 0, 0.85)",
  "&:hover": {
    opacity: 1
  },
  "&:active": {
    outline: "none"
  },
  "&.MuiTab-root": {
    color: "#0097ff",
    backgroundColor: "rgb(237,246,255)",
    minWidth: 180,
    minHeight: 42,
    padding: "6px 16px",
    borderRadius: "6px"
  },
  "&.Mui-selected": {
    color: "#fff",
    backgroundColor: "rgb(0, 129, 241)",
    outline: "none"
  }
}));
