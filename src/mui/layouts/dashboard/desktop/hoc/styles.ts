import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
// See also: https://material-ui.com/ru/customization/color/

const drawerWidth = 300
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
    borderLeftColor: grey[200],
    // backgroundColor: grey[200],
    color: '#000',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
    },
    // [theme.breakpoints.up('xs')]: {
    //   paddingLeft: theme.spacing(1),
    //   borderLeftWidth: theme.spacing(1),
    // },
    // [theme.breakpoints.up('sm')]: {
    //   paddingLeft: theme.spacing(2),
    //   borderLeftWidth: theme.spacing(1),
    // },
  },
  sublistItem: {
    borderLeftStyle: 'solid',
    borderLeftColor: grey[200],
    // backgroundColor: grey[200],
    color: grey[600],
    [theme.breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(1),
      borderLeftWidth: theme.spacing(1),
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(2),
      borderLeftWidth: theme.spacing(1),
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(2),
      borderLeftWidth: theme.spacing(1),
    },
    [theme.breakpoints.up('lg')]: {
      paddingLeft: theme.spacing(2),
      borderLeftWidth: theme.spacing(1),
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: theme.spacing(2),
      borderLeftWidth: theme.spacing(1),
    },
  },
  sublistItemDepth2: {
    borderLeftColor: grey[200],
    // backgroundColor: grey[200],
    // color: grey[300],
  },
  sublistItemDepth3: {
    borderLeftColor: grey[200],
    // backgroundColor: grey[200],
    // color: grey[300],
  },
  sublistItemLast: {
    borderBottomLeftRadius: '8px',
  },
}))
