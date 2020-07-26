import React, { useContext } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'
// import { makeStyles } from '@material-ui/core/styles'
// import Button from '@material-ui/core/Button'

// const useStyles = makeStyles((theme) => ({
//   button: {
//     margin: theme.spacing(1),
//   },
// }))

export const Igatec = () => {
  const { t } = useContext(MultilingualContext)
  // const classes = useStyles()

  return (
    <Container>
      <h1>IGATEC</h1>
      <p>{t('IN_PROGRESS')}</p>
      <ProTip />
    </Container>
  )
}
