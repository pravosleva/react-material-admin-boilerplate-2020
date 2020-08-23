## Render

```js
<Formik
  initialValues={{
    email: '',
    password: '',
  }}
  validate={(values: Values) => {
    const errors: Partial<Values> = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        .test(values.email)
    ) {
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
      YOUR COMPONENT
    </>
  )}
</Formik>
```
