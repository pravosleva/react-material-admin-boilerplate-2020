import React from 'react'
// Material icons: https://material-ui.com/ru/components/material-icons/
import HomeSharpIcon from '@material-ui/icons/HomeSharp'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

export const routes = [
  {
    path: '/',
    options: { text: 'Home', icon: <HomeSharpIcon />, access: ['free'] },
  },
  {
    path: '/create-user',
    options: { text: 'Create user', icon: <PersonAddIcon />, access: ['free'] },
  },
]
