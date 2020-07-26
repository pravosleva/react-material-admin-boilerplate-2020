import React, { useCallback, useState, useContext, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
// import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Typography from '@material-ui/core/Typography'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'

import { useStyles } from './styles'
import { routes, IRouteForMenu } from '@/mui/layouts/dashboard/routes-for-menu'
import { RouterLinkAsToolbarListItem } from '@/mui/custom-components/ToolbarLink/RouterLink'
import { isCurrentPath } from '@/utils/routing/isCurrentPath'
import { showAsyncToast } from '@/actions'
import { RouterSublist } from '@/mui/custom-components/ToolbarLink/RouterSublist'
import { MultilingualContext } from '@/common/context/mutilingual'

type TAnchor = 'top' | 'left' | 'bottom' | 'right'

interface IProps {
  location: any
  children: React.Component
}

const TemporaryDrawerHOCConnected: React.FC = (props: IProps) => {
  const classes = useStyles()
  const theme = useTheme()

  // Could be used if necessary...
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  // Main menu
  const toggleDrawer = (anchor: TAnchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  const isCurrentPathCb = useCallback(isCurrentPath, [])
  const { t } = useContext(MultilingualContext)
  const { location } = props
  const MemoizedList = useMemo(
    () => (
      <List>
        {routes.map(({ path, options, sublist }: IRouteForMenu, i) => {
          const { text, noTranslate, icon } = options
          const subpaths = !!sublist ? sublist.map((s) => s.path) : []
          const isActive = subpaths.some((p) => isCurrentPathCb(location.pathname, p))

          if (!!sublist) {
            return (
              <RouterSublist
                className={classes.listItem}
                key={path || i}
                path={path}
                icon={icon}
                primary={noTranslate ? text : t(text.toUpperCase().replace(' ', '_'))}
                sublist={sublist}
                button
                selected={isCurrentPathCb(location.pathname, `${path}`)}
                isMobile
                isActive={isActive}
              />
            )
          } else {
            return (
              <RouterLinkAsToolbarListItem
                className={classes.listItem}
                key={path}
                to={path}
                icon={icon}
                primary={noTranslate ? text : t(text.toUpperCase().replace(' ', '_'))}
                button
                selected={isCurrentPathCb(location.pathname, `${path}`)}
              />
            )
          }
        })}
      </List>
    ),
    [routes, isCurrentPathCb, location]
  )

  const list = (anchor: TAnchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {MemoizedList}
    </div>
  )

  // Profile menu
  const [anchorProfileMenuEl, setAnchorProfileMenuEl] = useState(null)
  const handleProfileMenuClick = (event: React.KeyboardEvent | React.MouseEvent) => {
    setAnchorProfileMenuEl(event.currentTarget)
  }
  const handleProfileMenuClose = () => {
    setAnchorProfileMenuEl(null)
  }
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(
      showAsyncToast({
        text: 'Logout in progress',
        type: 'info',
        delay: 4000,
      })
    )
    handleProfileMenuClose()
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        // className={clsx(classes.appBar, {
        //   [classes.appBarShift]: isToolbarOpen,
        // })}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
            edge="start"
            // className={clsx(classes.menuButton, {
            //   [classes.hide]: isToolbarOpen,
            // })}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Brand
          </Typography>
          <IconButton
            color="inherit"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuClick}
            // className={clsx(classes.menuButton, {
            //   [classes.hide]: isToolbarOpen,
            // })}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorProfileMenuEl}
            keepMounted
            open={!!anchorProfileMenuEl}
            onClose={handleProfileMenuClose}
          >
            {/*
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>My account</MenuItem>
            */}
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={state.left} onClose={toggleDrawer('left', false)}>
        <div className={classes.toolbar}>
          <IconButton onClick={toggleDrawer('left', false)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        {list('left')}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  )
}

export const TemporaryDrawerHOC = withRouter(TemporaryDrawerHOCConnected)
