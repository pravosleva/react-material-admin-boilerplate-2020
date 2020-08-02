import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  buttonBox: {
    marginTop: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(1),
  },
  input: {
    // margin: theme.spacing(1),
    width: '100%',
  },
  noTextDecoration: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  reactYoutubeContainer: {
    // display: 'flex',
    // justifyContent: 'center',
    position: 'relative',
    paddingBottom: '56.25%' /* 16:9 */,
    paddingTop: '25px',
    height: '0',
    overflow: 'hidden',
  },
  reactYoutube: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  },
}))
