import { AppBar, IconButton, Toolbar, Button, Avatar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Logo from '../../assets/logo1.png';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


import { useHistory } from "react-router";
import { exit } from "../../helpers/usedFunctions";

export default function Header({ styleClasses, open, handleDrawerOpen, hideBurgerMenu, hided }) {
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
          {hided &&
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
          }

          {!hided && <IconButton
            color="inherit"
            onClick={hideBurgerMenu}
            aria-label="open drawer"
            edge="start"
            size='small'
          >
            <ArrowForwardIcon />
          </IconButton>
          }

          <IconButton onClick={goHome}>
            <Avatar style={{ m: 1, mr: 3 }} src={Logo} />
          </IconButton>
          <Typography className={classes.logo}>Mi Entradita</Typography>
          <div style={{ marginLeft: "auto" }}>
            <Button onClick={() => exit(history)} >
              <LogoutIcon sx={{ color: 'white' }} />
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}