import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240
export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    marginRight: theme.spacing(4),
  },
  hide: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: theme.spacing(0, 1),
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 0, 0, 0),
  },
  listItem: {
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(3),
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
    },
  },
}))
