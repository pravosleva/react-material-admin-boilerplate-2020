import React, { useState, useCallback, useContext, useMemo } from 'react'
// See also: https://material-ui.com/ru/guides/composition/#caveat-with-inlining
import { RouterLinkAsToolbarListItem } from '@/mui/custom-components/ToolbarElement/RouterLink'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
// import ExpandLess from '@material-ui/icons/ExpandLess'
// import ExpandMore from '@material-ui/icons/ExpandMore'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { MultilingualContext } from '@/common/context/mutilingual'
import { isCurrentPath } from '@/utils/routing/isCurrentPath'
import { withRouter } from 'react-router-dom'
// import clsx from 'clsx'
// import { useStyles } from './styles'

// TODO: Use TypeScript!

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
  const { path, primary, icon, sublist, className, subclassName, location, isMobile, history, isActive, title } = props
  const [isOpened, setIsOpened] = useState(isActive)
  const handleClick = useCallback(() => {
    setIsOpened(!isOpened)
    if (!!path) history.push(path)
  }, [isOpened, history])
  const { t } = useContext(MultilingualContext)
  const isCurrentPathCb = useCallback(isCurrentPath, [])
  const isDisabled = !path && isMobile
  const Icon = useMemo(() => (isMobile ? null : isOpened ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />), [
    isOpened,
    isMobile,
  ])
  // const classes = useStyles()

  return (
    <>
      <ListItem
        button
        onClick={handleClick}
        className={className}
        selected={isCurrentPathCb(location.pathname, `${path}`)}
        disabled={isDisabled}
        title={title || null}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
        {Icon}
      </ListItem>
      <Collapse in={isOpened || isMobile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sublist.map(({ path, options }) => {
            const { text, noTranslate, icon, title } = options
            const displayText = noTranslate ? text : t(text.toUpperCase().replace(' ', '_'))

            return (
              <RouterLinkAsToolbarListItem
                key={path}
                to={path}
                primary={displayText}
                icon={icon}
                // className={classes.nested}
                className={subclassName}
                selected={isCurrentPathCb(location.pathname, `${path}`)}
                title={title || null}
              />
            )
          })}
        </List>
      </Collapse>
    </>
  )
}
export const RouterSublist = withRouter(RouterSublistWithRouter)
