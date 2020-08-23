import React, { useContext, useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'
import { Link } from 'react-router-dom'
import { useStyles } from './styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Button, LinearProgress } from '@material-ui/core'
// import TextField from '@material-ui/core/TextField'
import { Formik as Fk, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import ReactJson from 'react-json-view'
import Prism from 'prismjs'
import ReactMarkdown from 'react-markdown'
// @ts-ignore Cannot find module './CODE_SAMPLES.md' or its corresponding type declarations.
import codeSamplesMD from './CODE_SAMPLES.md'

interface Values {
  email: string
  password: string
}

export const Formik = () => {
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
  // {isCodeSamplesLoaded ? <ReactMarkdown source={codeSamples} /> : <h1>Pleace wait...</h1>}

  return (
    <Container>
      <h1>
        <Link className={classes.noTextDecoration} to="/training">
          {t('TRAINING')}
        </Link>{' '}
        | <code>Formik</code>
      </h1>
      <Grid container spacing={2}>
        <Fk
          initialValues={{
            email: '',
            password: '',
          }}
          validate={(values: Values) => {
            const errors: Partial<Values> = {}
            if (!values.email) {
              errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
              errors.email = 'Invalid email address'
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false)
              alert(JSON.stringify(values, null, 2))
            }, 500)
          }}
        >
          {({ submitForm, isSubmitting, errors, ...rest }) => (
            <>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={4}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Paper className={classes.paper}>
                      <h2>Form sample</h2>
                      <Form>
                        <Field
                          className={classes.input}
                          component={TextField}
                          name="email"
                          type="email"
                          label="Email"
                          error={!!errors.email}
                          helperText={errors.email}
                        />
                        <br />
                        <Field
                          className={classes.input}
                          component={TextField}
                          type="password"
                          label="Password"
                          name="password"
                        />

                        {isSubmitting && <LinearProgress />}
                        <div className={classes.buttonBox}>
                          <Button
                            disabled={Object.keys(errors).length > 0 || isSubmitting}
                            variant="contained"
                            color="primary"
                            onClick={submitForm}
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Paper className={classes.paper}>
                      {isCodeSamplesLoaded ? <ReactMarkdown source={codeSamples} /> : <h1>Pleace wait...</h1>}
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={8}>
                <Paper className={classes.paper}>
                  <h2>Render prop (args)</h2>
                  <ReactJson src={{ submitForm, isSubmitting, ...rest }} />
                </Paper>
              </Grid>
            </>
          )}
        </Fk>
      </Grid>
    </Container>
  )
}
