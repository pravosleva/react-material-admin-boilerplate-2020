import React, { useContext, useEffect, useState } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { MultilingualContext } from '@/common/context/mutilingual'
import { Link } from 'react-router-dom'
import { useStyles } from './styles'
import Prism from 'prismjs'
import ReactMarkdown from 'react-markdown'
// @ts-ignore Cannot find module './CODE_SAMPLES.md' or its corresponding type declarations.
import codeSamplesMD from './CODE_SAMPLES.md'

export const ComponentRenders = () => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()
  const [codeSamples, setCodeSamples] = useState('')
  const [isCodeSamplesLoaded, setIsCodeSamplesLoaded] = useState(false)
  useEffect(() => {
    fetch(codeSamplesMD)
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
  // {isCodeSamplesLoaded ? <ReactMarkdown source={codeSamples} /> : <h1>Please wait...</h1>}

  return (
    <Container>
      <h1>
        <Link className={classes.noTextDecoration} to="/training">
          {t('TRAINING')}
        </Link>{' '}
        |{' '}
        <Link className={classes.noTextDecoration} to="/training/tests-with-enzyme">
          {t('TESTS_WITH_ENZYME')}
        </Link>{' '}
        | {t('COMPONENT_RENDERS')}
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <Paper className={classes.paper}>
            {isCodeSamplesLoaded ? <ReactMarkdown source={codeSamples} /> : <h1>Please wait...</h1>}
          </Paper>
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
