import React from 'react'
// Material icons: https://material-ui.com/ru/components/material-icons/
import HomeSharpIcon from '@material-ui/icons/HomeSharp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BlockIcon from '@material-ui/icons/Block'

export interface IToolbarMenuItem {
  path?: string // Required if !sublist
  options: {
    text: string
    noTranslate?: boolean
    icon: JSX.Element
    access?: string[]
    title?: string
    description?: string
  }
  sublist?: IToolbarMenuItem[]
  depth?: number
}

export const toolbarMenu: IToolbarMenuItem[] = [
  {
    path: '/',
    options: {
      text: 'Home',
      icon: <HomeSharpIcon />,
      access: ['free'],
    },
  },
  // {
  //   path: '/create-user',
  //   options: { text: 'Create user', icon: <PersonAddIcon />, access: ['free'] },
  // },
  {
    path: '/training', // Optional (will be as button if !path)
    options: {
      text: 'TRAINING',
      title: 'Submenu with main route',
      icon: <ListAltIcon />,
      access: ['free'],
    },
    sublist: [
      {
        path: '/training/use-reducer',
        options: {
          text: 'useReducer',
          title: 'React hooks',
          noTranslate: true,
          icon: <BookmarkIcon />,
          access: ['free'],
          description: 'TRAINING_USE-REDUCER@DESCRIPTION',
        },
        depth: 2,
      },
      {
        path: '/training/use-ref',
        options: {
          text: 'useRef',
          title: 'React hooks',
          noTranslate: true,
          icon: <BookmarkIcon />,
          access: ['free'],
        },
        depth: 2,
      },
      {
        path: '/training/custom-hook',
        options: {
          text: 'Custom hook',
          title: 'React hooks',
          icon: <BookmarkIcon />,
          access: ['free'],
        },
        depth: 2,
      },
      {
        path: '/training/abort-controller',
        options: {
          text: 'AbortController',
          noTranslate: true,
          icon: <BookmarkIcon />,
          access: ['free'],
          description: 'TRAINING_ABORT-CONTROLLER@DESCRIPTION',
        },
        depth: 2,
      },
      {
        path: '/training/formik',
        options: {
          text: 'Formik',
          noTranslate: true,
          icon: <BookmarkIcon />,
          access: ['free'],
          description: 'TRAINING_FORMIK@DESCRIPTION',
        },
        depth: 2,
      },
      {
        path: '/training/nested-menu',
        options: {
          text: 'Nested_menu',
          icon: <BookmarkIcon />,
          access: ['free'],
        },
        depth: 2,
        sublist: [
          {
            path: '/training/nested-menu/depth3',
            options: {
              text: 'Depth 3',
              noTranslate: true,
              icon: <BookmarkIcon />,
              access: ['free'],
            },
            depth: 3,
          },
        ],
      },
      {
        path: '/training/tests-with-enzyme',
        options: {
          text: 'Tests_with_enzyme',
          icon: <BookmarkIcon />,
          access: ['free'],
        },
        depth: 2,
        sublist: [
          {
            path: '/training/tests-with-enzyme/component-renders',
            options: {
              text: 'Component_renders',
              icon: <BookmarkIcon />,
              access: ['free'],
              description: 'TRAINING_TESTS-WITH-ENZYME_COMPONENT-RENDERS@DESCRIPTION',
            },
            depth: 3,
          },
          {
            path: '/training/tests-with-enzyme/initial-todos-get-displayed',
            options: {
              text: 'INITIAL_TODOS_GET_DISPLAYED',
              icon: <BookmarkIcon />,
              access: ['free'],
              description: 'TRAINING_TESTS-WITH-ENZYME_INITIAL-TODOS-GET-DISPLAYED@DESCRIPTION',
            },
            depth: 3,
          },
        ],
      },
      {
        path: '/training/gallery',
        options: {
          text: 'Gallery',
          icon: <BookmarkIcon />,
          access: ['free'],
          // description: 'TRAINING_GALLERY@DESCRIPTION',
        },
        depth: 2,
        sublist: [
          {
            path: '/training/gallery/react-image-gallery',
            options: {
              text: 'react-image-gallery',
              noTranslate: true,
              icon: <BookmarkIcon />,
              access: ['free'],
              // description: 'TRAINING_REACT-IMAGE-GALLERY@DESCRIPTION',
            },
            depth: 3,
          },
        ],
      },
      {
        path: '/training/state',
        options: {
          text: 'State',
          icon: <BookmarkIcon />,
          access: ['free'],
          // description: 'TRAINING_STATE@DESCRIPTION',
        },
        depth: 2,
        sublist: [
          {
            path: '/training/state/use-immer',
            options: {
              text: 'Use-immer hook',
              noTranslate: true,
              icon: <BookmarkIcon />,
              access: ['free'],
              description: 'TRAINING_USE-IMMER@DESCRIPTION',
            },
            depth: 3,
          },
        ],
      },
    ],
  },
  {
    options: {
      text: 'Submenu as btn',
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
        depth: 2,
      },
    ],
  },
]
