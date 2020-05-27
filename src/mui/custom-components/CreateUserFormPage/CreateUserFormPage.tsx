import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'

import { validate } from './validate'
// import { asyncValidate } from './asyncValidate'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

interface IMUICreateUserFormPage {
  onSubmit: Function
  pristine?: boolean
  // reset?: void
  submitting: boolean
}

const CreateUserForm: any = (props: IMUICreateUserFormPage) => {
  const classes = useStyles()
  const { onSubmit, pristine, submitting } = props
  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(e)
  }
  return (
    <Container
      component="main"
      // maxWidth="xs"
    >
      <Typography component="h1" variant="h5" className={classes.title}>
        Создание нового пользователя
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper className={classes.paper}>
            <form
              className={classes.form}
              // noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <Grid container>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <Field
                    name="name"
                    component={renderTextField}
                    label="Имя"
                    // variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    autoFocus
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Button
                  type="submit"
                  // fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={pristine || submitting}
                >
                  Создать
                </Button>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper className={classes.paper}>
            <em>Something else...</em>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper className={classes.paper}>
            <em>Something else...</em>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export const CreateUserFormPage = reduxForm({
  form: 'createUser', // a unique identifier for this form
  validate,
  // asyncValidate,
})(CreateUserForm)
