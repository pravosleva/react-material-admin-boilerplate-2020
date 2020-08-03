import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as MUILink } from '@material-ui/core'
// See also: https://material-ui.com/ru/guides/composition/#caveat-with-inlining
import { useStyles } from './styles'
import clsx from 'clsx'

export interface IRouterLink {
  to: string
  label: string
  arrowLeft?: boolean
  arrowRight?: boolean
}

export function RouterLink(props: IRouterLink) {
  const { to, label, arrowLeft, arrowRight } = props
  const CustomLink = React.forwardRef((linkProps, _ref) => <ReactRouterLink to={to} {...linkProps} />)
  const classes = useStyles()

  return (
    <MUILink href={to} variant="body2" component={CustomLink}>
      {arrowLeft && <i className={clsx('fas fa-arrow-left', classes.rightSpace)}></i>}
      {label}
      {arrowRight && <i className={clsx('fas fa-arrow-right', classes.rightSpace)}></i>}
    </MUILink>
  )
}
