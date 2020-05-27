import React, { Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IRootState } from '@/store/IRootState'
import { showAsyncToast } from '@/actions'
import { getErrorString } from '@/utils/redux-from/errors'
import { CustomFullScreenLoader } from '@/mui/custom-components/Loader'

const LoginFormPage = React.lazy(() =>
  import(/* webpackChunkName: "LoginFormPage" */ '@/mui/custom-components/LoginFormPage').then(({ LoginFormPage }) => ({
    default: LoginFormPage,
  }))
)

export function Login() {
  const dispatch = useDispatch()
  const email = useSelector((state: IRootState) => state.form.login?.values?.email)
  const password = useSelector((state: IRootState) => state.form.login?.values?.password)
  const errors = useSelector((state: IRootState) => state.form.login?.syncErrors)
  const handleSubmit = () => {
    const errorMsg = getErrorString(errors)
    if (!!errorMsg) {
      dispatch(
        showAsyncToast({
          text: errorMsg,
          type: 'warning',
          delay: 5000,
        })
      )
      return
    }

    // TODO: dispatch login action
    dispatch(
      showAsyncToast({
        text: `${email}:${password}`,
        type: 'info',
        delay: 5000,
      })
    )
  }

  return (
    <Suspense fallback={<CustomFullScreenLoader />}>
      <LoginFormPage onSubmit={handleSubmit} submitting={false} pristine={false} />
    </Suspense>
  )
}
