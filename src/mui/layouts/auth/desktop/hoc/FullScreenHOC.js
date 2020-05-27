import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({})

export function FullScreenHOC(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  )
}
