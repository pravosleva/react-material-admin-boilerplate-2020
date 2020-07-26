import React from 'react'
import { Link } from 'react-router-dom'
import { Link as MUILink } from '@material-ui/core'
// See also: https://material-ui.com/ru/guides/composition/#caveat-with-inlining

export interface IRouterLink {
  to: string
  label: string
  arrowLeft?: boolean
  arrowRight?: boolean
}

export function RouterLink(props: IRouterLink) {
  const { to, label, arrowLeft, arrowRight } = props
  const CustomLink = React.forwardRef((linkProps, ref) => <Link to={to} {...linkProps} />)

  return (
    <MUILink href={to} variant="body2" component={CustomLink}>
      {arrowLeft && (
        <>
          <i className="fas fa-arrow-left"></i>{' '}
        </>
      )}
      {label}
      {arrowRight && (
        <>
          {' '}
          <i className="fas fa-arrow-right"></i>
        </>
      )}
    </MUILink>
  )
}
