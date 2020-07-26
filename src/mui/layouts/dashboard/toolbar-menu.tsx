import React from 'react'
// Material icons: https://material-ui.com/ru/components/material-icons/
import HomeSharpIcon from '@material-ui/icons/HomeSharp'
// import PersonAddIcon from '@material-ui/icons/PersonAdd'
import WorkIcon from '@material-ui/icons/Work'
import LinkIcon from '@material-ui/icons/Link'
import GitHubIcon from '@material-ui/icons/GitHub'

export interface IToolbarMenuItem {
  path?: string // Required if !sublist
  options: {
    text: string
    noTranslate?: boolean
    icon: JSX.Element
    access?: string[]
  }
  sublist?: IToolbarMenuItem[]
}

export const toolbarMenu: IToolbarMenuItem[] = [
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
        path: '/igatec/links',
        options: { text: 'Links', icon: <LinkIcon />, access: ['free'] },
      },
      {
        path: '/igatec/git-report',
        options: { text: 'Git Report', noTranslate: true, icon: <GitHubIcon />, access: ['free'] },
      },
    ],
  },
]
