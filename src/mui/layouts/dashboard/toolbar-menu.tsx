import React from 'react'
// Material icons: https://material-ui.com/ru/components/material-icons/
import HomeSharpIcon from '@material-ui/icons/HomeSharp'
// import PersonAddIcon from '@material-ui/icons/PersonAdd'
import ListAltIcon from '@material-ui/icons/ListAlt'
import LinkIcon from '@material-ui/icons/Link'
import GitHubIcon from '@material-ui/icons/GitHub'
import BlockIcon from '@material-ui/icons/Block'

export interface IToolbarMenuItem {
  path?: string // Required if !sublist
  options: {
    text: string
    noTranslate?: boolean
    icon: JSX.Element
    access?: string[]
    title?: string
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
    options: {
      text: 'Submenu 1',
      title: 'Submenu with main route',
      noTranslate: true,
      icon: <ListAltIcon />,
      access: ['free'],
    },
    sublist: [
      {
        path: '/igatec/links',
        options: {
          text: 'Links',
          title: 'Submenu item',
          icon: <LinkIcon />,
          access: ['free'],
        },
      },
      {
        path: '/igatec/git-report',
        options: {
          text: 'Git Report',
          title: 'Submenu item',
          noTranslate: true,
          icon: <GitHubIcon />,
          access: ['free'],
        },
      },
    ],
  },
  {
    options: {
      text: 'Submenu 2',
      title: 'Submenu without main route',
      noTranslate: true,
      icon: <ListAltIcon />,
      access: ['free'],
    },
    sublist: [
      {
        path: '/not-found',
        options: {
          text: '404',
          title: 'Submenu item',
          noTranslate: true,
          icon: <BlockIcon />,
          access: ['free'],
        },
      },
    ],
  },
]
