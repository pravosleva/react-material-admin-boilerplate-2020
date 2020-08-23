import { Home } from '@/pages/home'
// Material icons: https://material-ui.com/ru/components/material-icons/
import { Login } from '@/pages/auth/login'
import { ForgotPassword } from '@/pages/auth/forgot-password'
import { ConfirmPassword } from '@/pages/auth/confirm-password'
import { Training } from '@/pages/training'
import { UseReducer } from '@/pages/training/use-reducer'
import { UseRef } from '@/pages/training/use-ref'
import { CustomHook } from '@/pages/training/custom-hook'
import { AbortController } from '@/pages/training/abort-controller'
import { Formik } from '@/pages/training/formik'

export const routes = {
  mainRoutes: [
    // ATTENTION!
    // Main routes (Routes for dashboard layout) AS MENU ITEMS should be set to:
    // @/mui/layouts/dashboard/toolbar-menu
    {
      path: '/',
      exact: true,
      component: Home,
      options: { access: ['free'] },
    },
    // {
    //   path: '/create-user',
    //   exact: true,
    //   component: CreateUser,
    //   options: { access: ['free'] },
    // },
    {
      path: '/training',
      exact: true,
      component: Training,
      options: { access: ['free'] },
    },
    {
      path: '/training/use-reducer',
      exact: true,
      component: UseReducer,
      options: { access: ['free'] },
    },
    {
      path: '/training/use-ref',
      exact: true,
      component: UseRef,
      options: { access: ['free'] },
    },
    {
      path: '/training/custom-hook',
      exact: true,
      component: CustomHook,
      options: { access: ['free'] },
    },
    {
      path: '/training/abort-controller',
      exact: true,
      component: AbortController,
      options: { access: ['free'] },
    },
    {
      path: '/training/formik',
      exact: true,
      component: Formik,
      options: { access: ['free'] },
    },
  ],
  authRoutes: [
    {
      path: '/auth/login',
      exact: true,
      component: Login,
      options: { access: ['free'] },
    },
    {
      path: '/auth/forgot-password',
      exact: true,
      component: ForgotPassword,
      options: { access: ['free'] },
    },
    {
      path: '/auth/confirm-password/:id',
      exact: true,
      component: ConfirmPassword,
      options: { access: ['free'] },
    },
  ],
}
