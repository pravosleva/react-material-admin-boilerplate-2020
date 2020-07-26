import React, { useState, useCallback, useContext, useMemo } from 'react'
// See also: https://material-ui.com/ru/guides/composition/#caveat-with-inlining
import { RouterLinkAsToolbarListItem } from '@/mui/custom-components/ToolbarLink/RouterLink'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { MultilingualContext } from '@/common/context/mutilingual'
import { isCurrentPath } from '@/utils/routing/isCurrentPath'
import { withRouter } from 'react-router-dom'

// interface IProps {
//   to: string
//   primary: string
//   icon: any
// }
// interface IRouterSublist {
//   sublist: IProps[]
//   primary: string
//   icon: any
// }

function RouterSublistWithRouter(props) {
  const { path, primary, icon, sublist, className, location, isMobile, history, isActive } = props
  const [isOpened, setIsOpened] = useState(isActive)
  const handleClick = useCallback(() => {
    setIsOpened(!isOpened)
    if (!!path) history.push(path)
  }, [isOpened, history])
  const { t } = useContext(MultilingualContext)
  const isCurrentPathCb = useCallback(isCurrentPath, [])
  const isDisabled = !path && isMobile
  const Icon = useMemo(() => (isMobile ? null : isOpened ? <ExpandLess /> : <ExpandMore />), [isOpened])

  return (
    <>
      <ListItem
        button
        onClick={handleClick}
        className={className}
        selected={isCurrentPathCb(location.pathname, `${path}`)}
        disabled={isDisabled}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
        {Icon}
      </ListItem>
      <Collapse in={isOpened || isMobile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sublist.map(({ path, options }) => {
            const { text, noTranslate, icon } = options
            const displayText = noTranslate ? text : t(text.toUpperCase().replace(' ', '_'))

            return (
              <RouterLinkAsToolbarListItem
                key={path}
                to={path}
                primary={displayText}
                icon={icon}
                // className={classes.nested}
                className={className}
                selected={isCurrentPathCb(location.pathname, `${path}`)}
              />
            )
          })}
        </List>
      </Collapse>
    </>
  )
}
export const RouterSublist = withRouter(RouterSublistWithRouter)
