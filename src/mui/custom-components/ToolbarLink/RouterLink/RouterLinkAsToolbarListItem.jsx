import React from 'react'
import { Link } from 'react-router-dom'
// See also: https://material-ui.com/ru/guides/composition/#caveat-with-inlining
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

// TODO: Use TypeScript!
/*
import { Omit } from '@material-ui/types'

interface IProps {
  selected?: boolean
  button?: boolean
  icon: any
  primary: string
  to: string
}

export function MUIRouterLinkAsToolbarListItem(props: IProps) {
  const { to, primary, icon } = props
  const CustomLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />),
    [to]
  )

  return (
    <ListItem {...props} component={CustomLink}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  )
}
*/

export function RouterLinkAsToolbarListItem(props) {
  const { to, primary, icon } = props
  const CustomLink = React.useMemo(
    () => React.forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />),
    [to]
  )

  return (
    <ListItem {...props} component={CustomLink}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  )
}
