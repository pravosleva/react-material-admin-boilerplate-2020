import React, { lazy, Suspense } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { IRootState } from '@/store/IRootState'
import { showAsyncToast } from '@/actions'
import { getErrorString } from '@/utils/redux-from/errors'
import { CustomFullScreenLoader } from '@/mui/custom-components/Loader'

const ConfirmPasswordFormPage = lazy(() =>
  import(/* webpackChunkName: "ConfirmPasswordFormPage" */ '@/mui/custom-components/ConfirmPasswordFormPage').then(
    ({ ConfirmPasswordFormPage }) => ({
      default: ConfirmPasswordFormPage,
    })
  )
)

export function ConfirmPassword() {
  const dispatch = useDispatch()
  const password = useSelector((state: IRootState) => state.form.confirmPassword?.values?.password)
  const errors = useSelector((state: IRootState) => state.form.confirmPassword?.syncErrors)
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

    // TODO: dispatch confirm password action
    dispatch(
      showAsyncToast({
        text: `API: ${password}`,
        type: 'info',
        delay: 5000,
      })
    )
  }

  return (
    <Suspense fallback={<CustomFullScreenLoader />}>
      <ConfirmPasswordFormPage onSubmit={handleSubmit} submitting={false} pristine={false} />
    </Suspense>
  )
}
