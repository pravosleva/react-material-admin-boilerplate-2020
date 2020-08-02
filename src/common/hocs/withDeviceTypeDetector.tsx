import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { setDeviceType } from '@/actions/myDevice'
import { useDebounce } from '@/common/hooks/useDebounce'
import { defaultTheme } from '@/mui/theme'

const getDeviceTypeByWidth = (width: number) => {
  const { breakpoints } = defaultTheme
  const { values } = breakpoints
  const { xs, sm, md, lg /* xl */ } = values

  let type = 'desktop'

  if (width >= xs && width < sm) type = 'mobile'
  else if (width >= sm && width < md) type = 'tablet'
  else if (width >= md && width < lg) type = 'laptop'
  // else if (width >= lg && width < xl) { type = 'desktop' }
  else type = 'desktop'

  return type
}

export const withMyDeviceTypeDetector = (WrappedComponent: React.FC) => {
  const Wrapper = (props: any) => {
    const dispatch = useDispatch()
    const [monitorWidth, setMonitorWidth] = useState(window.innerWidth)
    const debouncedCurrentWidth = useDebounce(monitorWidth, 500)
    const getDeviceTypeByWidthCb = useCallback(getDeviceTypeByWidth, [])

    useEffect(() => {
      const setDevice = () => {
        const currentWidth = window.innerWidth

        setMonitorWidth(currentWidth)
      }

      setDevice() // First call only;
      window.addEventListener('resize', setDevice)

      return () => {
        window.removeEventListener('resize', setDevice)
      }
    }, [])

    useEffect(() => {
      dispatch(setDeviceType({ width: debouncedCurrentWidth, type: getDeviceTypeByWidthCb(debouncedCurrentWidth) }))
    }, [debouncedCurrentWidth, dispatch])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}
