import { makeStyles } from '@material-ui/core/styles'

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
}))
