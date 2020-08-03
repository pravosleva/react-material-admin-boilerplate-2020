import React, { useCallback } from 'react'
import { Field, reduxForm } from 'redux-form'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { RouterLink } from '@/mui/custom-components/RouterLink'
import { validate } from './validate'
import { useStyles } from './styles'

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

interface IMUILoginFormPage {
  onSubmit: Function
  pristine?: boolean
  // reset?: void
  submitting: boolean
}

const LoginForm: any = (props: IMUILoginFormPage) => {
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
          Авторизация
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
              // autoComplete="email"
              autoFocus
            />
          </div>
          <div>
            <Field
              name="password"
              component={renderTextField}
              label="Пароль"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type="password"
              id="password"
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
              Авторизоваться
            </Button>
          </Grid>
          <Grid container>
            <Grid item xs>
              <RouterLink to="/auth/forgot-password" label="Восстановить пароль" />
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

export const LoginFormPage = reduxForm({
  form: 'login', // a unique identifier for this form
  validate,
  // asyncValidate,
})(LoginForm)
