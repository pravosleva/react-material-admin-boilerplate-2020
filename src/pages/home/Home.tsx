import React, { useMemo, useContext } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}))

export const Home = () => {
  const { suppoerLocales, currentLang, t, setCurrentLang } = useContext(MultilingualContext)
  const classes = useStyles()
  const buttons = useMemo(
    () => (
      <>
        {suppoerLocales.map(({ label, name, value }) => (
          <Button
            key={value}
            // type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={currentLang === value}
            onClick={() => setCurrentLang(value)}
            title={name}
          >
            {label}
          </Button>
        ))}
      </>
    ),
    [currentLang]
  )

  return (
    <Container>
      <h1>
        {t('HOME')}: lang={currentLang}
      </h1>
      <p>WRAPPED TO DASHBOARD LAYOUT</p>
      {buttons}
      <ProTip />
    </Container>
  )
}
