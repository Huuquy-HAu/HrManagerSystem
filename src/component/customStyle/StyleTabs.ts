import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";

export const CustomTabMuis = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-root":{
    border:'none', 
    marginBottom:'20px',
  },
  "& .MuiTabs-flexContainer": {
    //   backgroundColor: '#1890ff',
    gap: "4px",
  },
  "& .MuiTabs-indicator":{
    height:'0px'
  }
});
