import React, { lazy, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { IRootState } from '@/store/IRootState'
import { showAsyncToast } from '@/actions'
import { getErrorString } from '@/utils/redux-from/errors'
import { CustomFullScreenLoader } from '@/mui/custom-components/Loader'

const CreateUserFormPage = lazy(() =>
  import(/* webpackChunkName: "CreateUserFormPage" */ '@/mui/custom-components/CreateUserFormPage').then(
    ({ CreateUserFormPage }) => ({
      default: CreateUserFormPage,
    })
  )
)

export function CreateUser() {
  const dispatch = useDispatch()
  const name = useSelector((state: IRootState) => state.form.createUser?.values?.name)
  const errors = useSelector((state: IRootState) => state.form.createUser?.syncErrors)
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
        text: `API: ${name}`,
        type: 'info',
        delay: 5000,
      })
    )
  }

  return (
    <Suspense fallback={<CustomFullScreenLoader />}>
      <CreateUserFormPage onSubmit={handleSubmit} submitting={false} pristine={false} />
    </Suspense>
  )
}
