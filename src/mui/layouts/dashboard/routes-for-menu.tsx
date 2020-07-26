import React from 'react'
// Material icons: https://material-ui.com/ru/components/material-icons/
import HomeSharpIcon from '@material-ui/icons/HomeSharp'
// import PersonAddIcon from '@material-ui/icons/PersonAdd'
import WorkIcon from '@material-ui/icons/Work'
import ReportIcon from '@material-ui/icons/Report'

interface IRoute {
  path?: string // Required if !sublist
  options: {
    text: string
    noTranslate?: boolean
    icon: JSX.Element
    access?: string[]
  }
  sublist?: IRoute[]
}

export const routes: IRoute[] = [
  {
    path: '/',
    options: { text: 'Home', icon: <HomeSharpIcon />, access: ['free'] },
  },
  // {
  //   path: '/create-user',
  //   options: { text: 'Create user', icon: <PersonAddIcon />, access: ['free'] },
  // },
  {
    path: '/igatec', // Optional (will be as button if !path)
    options: { text: 'IGATEC', noTranslate: true, icon: <WorkIcon />, access: ['free'] },
    sublist: [
      {
        path: '/igatec/report',
        options: { text: 'Report', icon: <ReportIcon />, access: ['free'] },
      },
    ],
  },
]
