import React, { useContext } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'

export const GitReport = () => {
  const { t } = useContext(MultilingualContext)

  return (
    <Container>
      <h1>Git {t('REPORT')}</h1>
      <p>
        External <code>window.fn</code>
      </p>
      <p>{t('IN_PROGRESS')}</p>
      <ProTip />
    </Container>
  )
}
