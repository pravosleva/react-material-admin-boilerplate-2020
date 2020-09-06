/* eslint-disable max-len */
import React, { useContext, useState, useEffect } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { MultilingualContext } from '@/common/context/mutilingual'
import { Link } from 'react-router-dom'
import { useStyles } from './styles'
import 'react-image-gallery/styles/css/image-gallery.css'
import { useImmer } from 'use-immer'
import Button from '@material-ui/core/Button'
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1'
import PlusOneIcon from '@material-ui/icons/PlusOne'
import Prism from 'prismjs'
// @ts-ignore Cannot find module './CODE_SAMPLES.md' or its corresponding type declarations.
import codeSamplesMD from './CODE_SAMPLES.md'
import ReactMarkdown from 'react-markdown'

const initialState = {
  value: 0,
}

export const UseImmer = () => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()
  const [count, updateCounter] = useImmer(initialState)
  const handleInc = () => {
    updateCounter((draft) => {
      draft.value = draft.value + 1
    })
  }
  const handleDec = () => {
    updateCounter((draft) => {
      draft.value = draft.value - 1
    })
  }
  const handleReset = () => {
    updateCounter(() => initialState)
  }

  // --- Code samples
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
  // ---

  return (
    <Container>
      <h1>
        <Link className={classes.noTextDecoration} to="/training">
          {t('TRAINING')}
        </Link>{' '}
        |{' '}
        <Link className={classes.noTextDecoration} to="/training/state">
          {t('STATE')}
        </Link>{' '}
        | <code>useImmer</code>
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper className={classes.paper}>
            <div className={classes.buttonBox}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                disabled={count.value >= 5}
                onClick={handleInc}
                title="INC"
              >
                <PlusOneIcon />
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                disabled={count.value <= -5}
                onClick={handleDec}
                title="DEC"
              >
                <ExposureNeg1Icon />
              </Button>
              <Button variant="contained" fullWidth color="primary" onClick={handleReset} title="RESET">
                RESET
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper className={classes.paper}>{count.value}</Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={4}></Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={6}>
          <Paper className={classes.paper}>
            {isCodeSamplesLoaded ? <ReactMarkdown source={codeSamples} /> : <h1>Please wait...</h1>}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={2} lg={2} xl={4}></Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
