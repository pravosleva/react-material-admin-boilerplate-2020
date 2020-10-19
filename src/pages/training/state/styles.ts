import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noTextDecoration: {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
    heading: {
      flexBasis: '50%',
      flexShrink: 0,
    },
    details: {
      color: grey[600],
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    paper: {
      padding: theme.spacing(2),
    },
  })
)
