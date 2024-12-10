import React from 'react'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link as RouterLink } from 'react-router-dom'
import { Theme } from '@mui/material/styles'
import { makeStyles } from '@mui/styles'

interface HeaderProps {
  signedIn?: boolean;
  setLoginState?: (isSignedIn: boolean, isAdmin: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ signedIn, setLoginState }) => {
  const handleClick = () => {
    if (signedIn && setLoginState) {
      setLoginState(false, false);
    }
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        width: '100%',
        zIndex: 10,
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          component={RouterLink}
          to="/"
        >
          Home
        </Typography>
        <Button
          color="primary"
          variant="outlined"
          sx={{ margin: (theme) => theme.spacing(1, 1.5) }}
          component={RouterLink}
          to={signedIn ? '/' : '/auth/signin'}
          onClick={handleClick}
        >
          {signedIn ? 'Logout' : 'Login'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
