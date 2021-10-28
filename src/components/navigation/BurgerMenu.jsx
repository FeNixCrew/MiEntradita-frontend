import { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Header from './Header';
import { Tooltip } from '@material-ui/core';
import { useHistory } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import { label } from '../../helpers/usedFunctions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  logo: {
    hover: {
      color: '#0056b3',
      fontWeight: 'bolder',
      '& $icon': {
        color: theme.palette.primary.main,
      },
    },
    fontFamily: 'Quicksand',
    flexGrow: 1,
    letterSpacing: 5,
    fontSize: 23,
    color: 'white',
    marginLeft: '2vh',

  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#2e86c1',
    color: 'white'
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    backgroundColor: '#ecf0f1',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    content: {
      width: `calc(100vw - ${drawerWidth}px)`,
    }
  },
  drawerClose: {
    backgroundColor: '#ecf0f1',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    content: {
      width: `calc(100vw - ${theme.spacing(7) + 1})`,
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - 64px)`,
  },
  Icon: {
    height: 58,
  },
  drawerBottom: {
    marginTop: 'auto'
  },
}));

export default function BurgerMenu({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const username = localStorage.username;
  const role = localStorage.role;

  const drawerItems = [
    {
      text: 'Inicio',
      icon: <HomeIcon style={{ color: 'black' }} />,
      onClick: () => history.push(`/${username}/home`),
      enabled: role && role === 'ROLE_USER'
    },
    {
      text: 'Inicio',
      icon: <HomeIcon style={{ color: 'black' }} />,
      onClick: () => history.push(`/${username}/home`),
      enabled: role && role === 'ROLE_ADMIN'
    },
    {
      text: 'Buscar partidos',
      icon: <SearchIcon style={{ color: 'black' }} />,
      onClick: () => history.push(`/${username}/search`),
      enabled: role && role === 'ROLE_USER'
    },
    {
      text: 'Agregar partido',
      icon: <AddIcon style={{ color: 'black' }} />,
      onClick: () => history.push(`/${username}/add-match`),
      enabled: role && role === 'ROLE_ADMIN'
    },
    {
      text: 'Agregar equipo',
      icon: <AddModeratorIcon style={{ color: 'black' }} />,
      onClick: () => history.push(`/${username}/add-team`),
      enabled: role && role === 'ROLE_ADMIN'
    }
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header styleClasses={classes} open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: 'black' }} /> : <ChevronLeftIcon style={{ color: 'black' }} />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {drawerItems.map((item) => (
            item.enabled &&
            <Tooltip key={item.text} title={item.text} placement="right" disableHoverListener={open}>
              <ListItem
                button
                key={item.text}
                onClick={item.onClick}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText style={{ color: 'black' }} primary={label(item.text)} />
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}