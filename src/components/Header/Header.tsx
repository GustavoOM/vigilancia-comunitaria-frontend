import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import Logout from '@mui/icons-material/Logout';
import reactLogo from "../../assets/logoHeader.svg";

function handleLogout(){
  localStorage.setItem("vigilancia-token", "");
  window.location.href = "/login";
}

function Header() {
  return (
    <React.Fragment>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={reactLogo} alt="Logo" style={{ height: 30 }} />
          </Typography>
          <IconButton
            size="large"
            aria-label="notificações"
            color="secondary"
            sx={{ mr: 2 }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="secondary"
            aria-label="procurar"
            sx={{ mr: 2 }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="secondary"
            aria-label="sair"
          >
            <Logout onClick={() => {handleLogout()}}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Header;
