import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { validate } from './validate'
// import { asyncValidate } from './asyncValidate'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
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

interface IMUIConfirmPasswordFormPage {
  onSubmit: Function
  pristine?: boolean
  // reset?: void
  submitting: boolean
}

const ConfirmPasswordForm: any = (props: IMUIConfirmPasswordFormPage) => {
  const classes = useStyles()
  const { onSubmit, pristine, submitting } = props
  const handleSubmit = (e: any) => {
    e.preventDefault()
    onSubmit(e)
  }
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Подтверждение пароля
        </Typography>
        <form
          className={classes.form}
          // noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <Field
              name="password"
              component={renderTextField}
              label="Пароль"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              // autoComplete="email"
              autoFocus
            />
          </div>
          <div>
            <Field
              name="password2"
              component={renderTextField}
              label="Повторить пароль"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password2"
              id="password2"
              // autoComplete="current-password"
            />
          </div>
          <Grid container>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={pristine || submitting}
            >
              Подтвердить
            </Button>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export const ConfirmPasswordFormPage = reduxForm({
  form: 'confirmPassword', // a unique identifier for this form
  validate,
  // asyncValidate,
})(ConfirmPasswordForm)
