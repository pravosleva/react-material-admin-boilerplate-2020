import React, { useCallback, useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
// import ListSubheader from '@material-ui/core/ListSubheader'
// Look: https://material-ui.com/components/lists/#%D0%B2%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9-%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { useStyles } from './styles'
import { RouterLinkAsToolbarListItem } from '@/mui/custom-components/ToolbarLink/RouterLink'
import { RouterSublist } from '@/mui/custom-components/ToolbarLink/RouterSublist'
import { routes } from '@/mui/layouts/dashboard/routes-for-menu'
import { isCurrentPath } from '@/utils/routing/isCurrentPath'
import { showAsyncToast } from '@/actions'
import { MultilingualContext } from '@/common/context/mutilingual'

interface IProps {
  location: any
  children: React.Component
}

const MiniDrawerLeftHOCConnected: React.FC = (props: IProps) => {
  const classes = useStyles()
  const theme = useTheme()

  // Main menu
  const [isToolbarOpen, setIsToolbarOpen] = useState(false)
  const handleDrawerOpen = () => {
    setIsToolbarOpen(true)
  }
  const handleDrawerClose = () => {
    setIsToolbarOpen(false)
  }
  const isCurrentPathCb = useCallback(isCurrentPath, [])

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
  const { t, currentLang } = useContext(MultilingualContext)

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: isToolbarOpen,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: isToolbarOpen,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {t('BRAND')} {currentLang}
          </Typography>
          <IconButton
            color="inherit"
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuClick}
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
            <MenuItem onClick={handleLogout}>{t('LOGOUT')}</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: isToolbarOpen,
          [classes.drawerClose]: !isToolbarOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: isToolbarOpen,
            [classes.drawerClose]: !isToolbarOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {routes.map(({ path, options, sublist }, i) => {
            const { text, noTranslate, icon } = options
            const { location } = props

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
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  )
}

export const MiniDrawerLeftHOC = withRouter(MiniDrawerLeftHOCConnected)
