import React, { useState, useCallback, useContext, useMemo } from 'react'
// See also: https://material-ui.com/ru/guides/composition/#caveat-with-inlining
import { RouterLinkAsToolbarListItem } from '@/mui/custom-components/ToolbarElement/RouterLinkAsToolbarListItem'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { MultilingualContext } from '@/common/context/mutilingual'
import { isCurrentPath } from '@/utils/routing/isCurrentPath'
import { useLocation, useHistory } from 'react-router-dom'
import clsx from 'clsx'
import { getModifiedPhraseForTranslate } from '@/utils/multilingual/getModifiedPhraseForTranslate'

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

export const RouterSublist = (props) => {
  const {
    path,
    primary,
    icon,
    sublist,
    className,
    subclassName,
    // location,
    isMobile,
    // history,
    isActive: isHeaderActive,
    title,
    subclassNameLast,
    // subclassName,
    // depth = 2,
    subclassNameDepth2,
    subclassNameDepth3,
  } = props
  const [isOpened, setIsOpened] = useState(isHeaderActive)
  const location = useLocation()
  const history = useHistory()
  const handleClick = useCallback(() => {
    setIsOpened(!isOpened)
    if (!!path) history.push(path)
  }, [isOpened, history])
  const { t } = useContext(MultilingualContext)
  const isDisabled = !path && isMobile
  const Icon = useMemo(() => (isMobile ? null : isOpened ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />), [
    isOpened,
    isMobile,
  ])

  return (
    <>
      <ListItem
        button
        onClick={handleClick}
        className={className}
        selected={isCurrentPath(location.pathname, `${path}`) || isHeaderActive}
        disabled={isDisabled}
        title={title || null}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
        {Icon}
      </ListItem>
      <Collapse in={isOpened || isMobile || isHeaderActive} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sublist.map(({ path, options: { text, noTranslate, icon, title }, sublist, depth }, i, a) => {
            const displayText = noTranslate ? text : t(getModifiedPhraseForTranslate(text))

            if (!!sublist) {
              return (
                <RouterSublist
                  className={className}
                  subclassName={subclassName}
                  subclassNameLast={clsx(subclassNameLast, {
                    [subclassNameDepth2]: depth === 2,
                    [subclassNameDepth3]: depth === 3,
                  })}
                  key={path || i}
                  path={path}
                  icon={icon}
                  primary={noTranslate ? text : t(getModifiedPhraseForTranslate(text))}
                  sublist={sublist}
                  depth={depth}
                  button
                  selected={isCurrentPath(location.pathname, `${path}`)}
                  // isActive={isActive}
                  title={title || null}
                  isMobile={isMobile}
                />
              )
            }
            return (
              <RouterLinkAsToolbarListItem
                key={path}
                to={path}
                primary={displayText}
                icon={icon}
                className={i === a.length - 1 ? clsx(subclassName, subclassNameLast) : subclassName}
                selected={isCurrentPath(location.pathname, `${path}`)}
                title={title || null}
              />
            )
          })}
        </List>
      </Collapse>
    </>
  )
}
