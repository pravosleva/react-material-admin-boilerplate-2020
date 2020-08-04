import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  gridBox: {
    // marginTop: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(2),
    },
  },
  switchersBox: {},
  input: {
    width: '100%',
  },
  code: {
    overflow: 'auto',
  },
  noTextDecoration: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  badgeBox: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}))
