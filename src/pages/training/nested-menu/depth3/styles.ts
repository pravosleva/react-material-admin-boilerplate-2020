import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  noTextDecoration: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}))
