import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

import { showAsyncToast, TToast } from '@/actions'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}))

interface IProps {
  permanentMessage?: {
    text: string
    type: TToast
    delay?: number
  }
  dispatch?: Function
}

export function CustomFullScreenLoaderConnected(props: IProps) {
  const classes = useStyles()

  useEffect(() => {
    if (!!props.permanentMessage) {
      const { text, type, delay = 4000 } = props.permanentMessage
      props.dispatch(showAsyncToast({ text, type, delay }))
    }
  }, [])

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  )
}

export const CustomFullScreenLoader = connect()(CustomFullScreenLoaderConnected)
