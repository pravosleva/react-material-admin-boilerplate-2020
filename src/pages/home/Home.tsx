import React, { useMemo, useContext, useCallback, useEffect, useState } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Prism from 'prismjs'
import ReactMarkdown from 'react-markdown'
// @ts-ignore Cannot find module './CODE_SAMPLES.md' or its corresponding type declarations.
import roadMapMD from '@appReadmeMD'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// eslint-disable-next-line no-console
console.log(roadMapMD)

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
  },
}))

export const Home = () => {
  const { suppoerLocales, currentLang, t, setCurrentLang } = useContext(MultilingualContext)
  const classes = useStyles()
  const handleClick = useCallback(
    (value: string) => (_e: React.MouseEvent<HTMLButtonElement>) => setCurrentLang(value),
    []
  )
  const buttons = useMemo(
    () => (
      <>
        {suppoerLocales.map(({ label, name, value }) => {
          const isDisabled = currentLang === value
          return (
            <Button
              key={value}
              // type="submit"
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={isDisabled}
              onClick={handleClick(value)}
              title={name}
            >
              {label}
            </Button>
          )
        })}
      </>
    ),
    [currentLang]
  )
  const [codeSamples, setCodeSamples] = useState('')
  const [isCodeSamplesLoaded, setIsCodeSamplesLoaded] = useState(false)
  useEffect(() => {
    fetch(roadMapMD)
      .then((res) => res.text())
      .then((md) => {
        setCodeSamples(md)
        setIsCodeSamplesLoaded(true)
        // You can call the Prism.js API here
        // Use setTimeout to push onto callback queue so it runs after the DOM is updated
        setTimeout(() => {
          Prism.highlightAll()
        }, 0)
      })
  }, [])

  return (
    <Container>
      <h1>{t('HOME')}</h1>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Paper className={classes.paper}>
            <h2>Lang= {currentLang}</h2>
            {buttons}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <Paper className={classes.paper}>
            {isCodeSamplesLoaded ? <ReactMarkdown source={codeSamples} /> : <h1>Please wait...</h1>}
          </Paper>
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
