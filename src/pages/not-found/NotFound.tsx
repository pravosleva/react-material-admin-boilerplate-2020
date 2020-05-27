import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@material-ui/core'

export const NotFound = () => (
  <Container>
    <h1>PAGE NOT FOUND</h1>
    <p>
      Page not found <Link to="/">Go to homepage</Link>
    </p>
  </Container>
)
