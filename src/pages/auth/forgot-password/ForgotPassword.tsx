import React, { lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'

// import { ForgotPasswordFormPage } from '@/mui/custom-components/ForgotPasswordFormPage'
import { IRootState } from '@/store/IRootState'
import { showAsyncToast } from '@/actions'
import { getErrorString } from '@/utils/redux-from/errors'
import { delay } from '@/utils/delay'
import { CustomFullScreenLoader } from '@/mui/custom-components/Loader'

const ForgotPasswordFormPage = lazy(() =>
  import(/* webpackChunkName: "ForgotPasswordFormPage" */ '@/mui/custom-components/ForgotPasswordFormPage').then(
    ({ ForgotPasswordFormPage }) => ({
      default: ForgotPasswordFormPage,
    })
  )
)

export function ForgotPasswordConnected({ history }) {
  const dispatch = useDispatch()
  const email = useSelector((state: IRootState) => state.form.forgotPassword?.values?.email)
  const errors = useSelector((state: IRootState) => state.form.forgotPassword?.syncErrors)
  const handleSubmit = async () => {
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

    // TODO: dispatch forgot password action
    dispatch(
      showAsyncToast({
        text: `1) API. 2) Backend: Confirmation link should be sent to ${email}...`,
        type: 'info',
        delay: 5000,
      })
    )
    await delay(1000)
    dispatch(
      showAsyncToast({
        text: 'Redirecting...',
        type: 'info',
        delay: 5000,
      })
    )
    await delay(1000)

    // ATTENTION! For demo only.
    // Редирект происходит в саге!
    // https://stackoverflow.com/questions/56184152/can-we-redirect-to-in-reduxsaga
    history.push('/auth/confirm-password/1')
  }

  return (
    <Suspense fallback={<CustomFullScreenLoader />}>
      <ForgotPasswordFormPage onSubmit={handleSubmit} submitting={false} pristine={false} />
    </Suspense>
  )
}

export const ForgotPassword = withRouter(ForgotPasswordConnected)
