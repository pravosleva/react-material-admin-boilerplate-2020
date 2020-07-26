import React, { useContext } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'

export const Links = () => {
  const { t } = useContext(MultilingualContext)

  return (
    <Container>
      <h1>{t('LINKS')}</h1>
      <p>{t('IN_PROGRESS')}</p>
      <p>
        <a
          href="https://3dswym.igatec.com:204/3dswym/#community:ZqvIWDkyRMu02s5PxjXS4w/wiki:nr5Za572Suyrarbb0-3DeQ"
          rel="noopener noreferrer"
          target="_blank"
        >
          Заполнение и подача табеля
        </a>
      </p>
      <ProTip />
    </Container>
  )
}
