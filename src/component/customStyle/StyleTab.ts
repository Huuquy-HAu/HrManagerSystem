import { styled } from "@mui/material/styles";
import Tab from "@mui/material/Tab";

interface ICustomTabProps {
  "valid"?: boolean;
}

export const CustomTabMui = styled(Tab)<ICustomTabProps>(({ theme, ...props }) => ({
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
    color: props["valid"] ? "#0097ff" : "rgb(229, 72, 77)",
    backgroundColor: props["valid"] ? "rgb(237,246,255)" : "rgb(255,239,239)",
    minWidth: 180,
    minHeight: 42,
    padding: "6px 16px",
    borderRadius: "6px"
  },
  "&.Mui-selected": {
    color: "#fff",
    backgroundColor: props["valid"] ? "rgb(0, 129, 241)" : "rgb(229,72,77)",
    outline: "none"
  }
}));
