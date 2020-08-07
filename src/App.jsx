import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withMyDeviceTypeDetector } from '@/common/hocs/withDeviceTypeDetector'
// import { asyncLoadUserInfoData, asyncLoadTestData } from '@/actions'
import { NotFound } from '@/pages/not-found'
import { CustomFullScreenLoader as FullScreenLoader } from '@/mui/custom-components/Loader'
import { MiniDrawerLeftHOC as MiniDrawerLeftDesktop } from '@/mui/layouts/dashboard/desktop'
import { TemporaryDrawerHOC as TemporaryDrawerMobile } from '@/mui/layouts/dashboard/mobile'
import { FullScreenHOC as AuthFullScreenDesktop } from '@/mui/layouts/auth/desktop'
import { routes } from '@/routes'

const { mainRoutes, authRoutes } = routes

// 1.1 DESKTOP DASHBOARD LAYOUT
const renderLoggedDesktop = () => (
  <MiniDrawerLeftDesktop>
    <Switch>
      {mainRoutes.map(({ path, component, exact }) => (
        <Route path={path} component={component} key={path} exact={exact} />
      ))}
      <Route exact path="/*" component={NotFound} />
    </Switch>
  </MiniDrawerLeftDesktop>
)

// 1.2 DESKTOP AUTH LAYOUT
const renderAuthDesktop = () => (
  <AuthFullScreenDesktop>
    <Switch>
      {authRoutes.map(({ path, component, exact }) => (
        <Route path={path} component={component} key={path} exact={exact} />
      ))}
      {/* <Route exact path="/*" component={NotFound} /> */}
      <Redirect to="/auth/login" />
    </Switch>
  </AuthFullScreenDesktop>
)

// 2.1 MOBILE DASHBOARD LAYOUT
const renderLoggedMobile = () => (
  <TemporaryDrawerMobile>
    <Switch>
      {mainRoutes.map(({ path, component, exact }) => (
        <Route path={path} component={component} key={path} exact={exact} />
      ))}
      <Route exact path="/*" component={NotFound} />
    </Switch>
  </TemporaryDrawerMobile>
)

// 2.2 MOBILE AUTH LAYOUT
const renderAuthMobile = () => (
  <AuthFullScreenDesktop>
    <Switch>
      {authRoutes.map(({ path, component, exact }) => (
        <Route path={path} component={component} key={path} exact={exact} />
      ))}
      {/* <Route exact path="/*" component={NotFound} /> */}
      <Redirect to="/auth/login" />
    </Switch>
  </AuthFullScreenDesktop>
)

// 3. UNDEFINED DEVICE TYPE LAYOUT
const renderUndefinedDeviceType = ({ deviceType }) => (
  <FullScreenLoader permanentMessage={{ text: `Device type ${deviceType} not supported yet`, type: 'warning' }} />
)

class ConnectedApp extends React.Component {
  componentDidMount() {
    // TODO: APP INIT AS AUTHORIZATION
    // this.props.dispatch(asyncLoadUserInfoData())
    // this.props.dispatch(asyncLoadTestData())
  }
  render() {
    const { isDeviceTypeDetected, deviceType, userInfo } = this.props

    // TODO: USER AUTH INFO SHOULD BE SET TO REDUX
    const isLogged = true
    const isLoadingUserInfo = userInfo.isLoading

    if (isDeviceTypeDetected || isLoadingUserInfo) {
      switch (deviceType) {
        case 'mobile':
          if (isLogged) {
            return renderLoggedMobile()
          } else {
            return renderAuthMobile()
          }
        case 'tablet': // TODO: renderAuthTablet
        case 'laptop': // TODO: renderAuthLaptop
        case 'desktop':
          if (isLogged) {
            return renderLoggedDesktop()
          } else {
            return renderAuthDesktop()
          }
        default:
          return renderUndefinedDeviceType({ deviceType })
      }
    } else {
      return <FullScreenLoader />
    }
  }
}

const mapStateToProps = (state) => ({
  isDeviceTypeDetected: state.myDevice.isDetected,
  deviceType: state.myDevice.type,
  userInfo: state.userInfo,
})

export const App = connect(mapStateToProps)(withMyDeviceTypeDetector(ConnectedApp))
