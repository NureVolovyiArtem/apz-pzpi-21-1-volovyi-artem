import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export function Header() {
  const { auth, setAuth } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (auth.userId) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAuth({ userId: undefined, bearer: undefined, role: undefined });
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component={LinkRouter}
          to="/"
          sx={{
            mr: 2,
            fontWeight: 600,
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          AutoCab
        </Typography>
        {!auth.userId && (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleMenuOpen}
            component={LinkRouter}
            to="/login"
          >
            {"Sign in"}
          </Button>
        )}
        {auth.userId && (
          <Box display="flex" justifyContent="space-between">
            <IconButton
              size="medium"
              color="inherit"
              aria-label="user profile"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              <AccountCircleIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={LinkRouter} to="/profile" onClick={handleMenuClose}>
                {"Profile"}
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                {"Logout"}
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}