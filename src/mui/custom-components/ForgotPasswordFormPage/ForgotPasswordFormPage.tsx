import React, { useCallback } from 'react'
import { Field, reduxForm } from 'redux-form'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { RouterLink } from '@/mui/custom-components/ToolbarLink/RouterLink'
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

interface IMUIForgotPasswordFormPage {
  onSubmit: Function
  pristine?: boolean
  // reset?: void
  submitting: boolean
}

const ForgotPasswordForm: any = (props: IMUIForgotPasswordFormPage) => {
  const classes = useStyles()
  const { onSubmit, pristine, submitting } = props
  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault()
      onSubmit(e)
    },
    [onSubmit]
  )
  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Восстановление пароля
        </Typography>
        <form
          className={classes.form}
          // noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div>
            <Field
              name="email"
              component={renderTextField}
              label="Email"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              autoComplete="email"
              autoFocus
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
              Получить ссылку
            </Button>
          </Grid>
          <Grid container>
            <Grid item xs>
              <RouterLink arrowLeft to="/auth/login" label="Авторизоваться" />
            </Grid>
            {/*
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            */}
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export const ForgotPasswordFormPage = reduxForm({
  form: 'forgotPassword', // a unique identifier for this form
  validate,
  // asyncValidate,
})(ForgotPasswordForm)
