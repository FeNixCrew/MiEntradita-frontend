import { AppBar, IconButton, Toolbar, Button, Avatar } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Logo from '../../assets/logo1.png';
import LogoutIcon from '@mui/icons-material/Logout';

import { useHistory } from "react-router";
import { exit } from "../../helpers/usedFunctions";
import { Typography } from "@mui/material";

export default function Header({styleClasses, open, handleDrawerOpen}) {
  const classes = styleClasses;
  const history = useHistory();
  const goHome = () => {
    let username = localStorage.getItem('username');
        history.push(`/${username}/home`)
  }

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appColor, classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
            aria-label="open drawer"
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <IconButton onClick={goHome}>
          <Avatar sx={{ m: 1, mr: 3 }} src={Logo} />
      <Typography
          style={{
              flexGrow: 1,
              letterSpacing: 2,
              fontSize: 20,
              color: 'black',
              fontFamily: 'Monospace',
              marginLeft: '2vh'
          }}>
          Mi Entradita
          </Typography>
          </IconButton>
          <div style={{ marginLeft: "auto" }}>
            <Button onClick={() => exit(history)} >
                <LogoutIcon sx={{ color: 'black' }} />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}