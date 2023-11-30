import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
import { Groups } from "@mui/icons-material";
import reactLogo from "../../assets/logoHeader.svg";
import { useNavigate } from 'react-router-dom';

function handleLogout(){
  localStorage.removeItem("vigilancia-token");
  window.location.href = "/login";
}

function Header() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <AppBar sx={{ height: "68px" }} position="fixed" color="inherit">
        <Toolbar sx={{ height: "100%" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            <img src={reactLogo} alt="Logo" style={{ height: 30 }} />
          </Typography>

          <IconButton
            size="large"
            edge="end"
            aria-label="procurar"
            sx={{ mr: 2 }}
            onClick={() => navigate("/comunidades")}
          >
            <Groups sx={{color: "var(--roxo700)"}} />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="sair"
            onClick={() => {handleLogout()}}
          >
            <Logout sx={{color: "var(--roxo700)"}} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Header;
