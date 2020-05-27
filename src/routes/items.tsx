import { Home } from '@/pages/home'
import { CreateUser } from '@/pages/create-user'
import { Login } from '@/pages/auth/login'
import { ForgotPassword } from '@/pages/auth/forgot-password'
import { ConfirmPassword } from '@/pages/auth/confirm-password'

export const routes = {
  mainRoutes: [
    // ATTENTION!
    // Main routes (Routes for dashboard layout) AS MENU ITEMS should be set to:
    // layouts/dashboard/routes-for-menu
    {
      path: '/',
      exact: true,
      component: Home,
      options: { access: ['free'] },
    },
    {
      path: '/create-user',
      exact: true,
      component: CreateUser,
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
