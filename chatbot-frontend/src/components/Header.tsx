import { AppBar, Toolbar, Typography } from "@mui/material";
import Logo from "../../public/logo.svg"


export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#ffffff" }}>
      <Toolbar>
         <Logo alt="Logo"  />    
      </Toolbar>
    </AppBar>
  );
}
