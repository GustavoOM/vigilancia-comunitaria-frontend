import * as React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import reactLogo from "../../assets/logoHeader.svg";

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
            aria-label="show 17 new notifications"
            color="secondary"
            sx={{ mr: 2 }}
          >
            <NotificationsIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            color="secondary"
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

export default Header;
