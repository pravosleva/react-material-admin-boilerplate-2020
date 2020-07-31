import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
// See also: https://material-ui.com/ru/customization/color/

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    margin: theme.spacing(0, 1, 0, 0),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3, 0, 0, 0),
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  toolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
  },
  listItem: {
    paddingLeft: theme.spacing(3),
  },
  sublistItem: {
    borderLeftStyle: 'solid',
    borderLeftColor: grey[300],
    // backgroundColor: grey[100],
    color: '#000',
    [theme.breakpoints.up('xs')]: {
      paddingLeft: theme.spacing(2),
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
}))
