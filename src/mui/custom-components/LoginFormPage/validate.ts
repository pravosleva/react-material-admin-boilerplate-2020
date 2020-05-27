export const validate = (values: any) => {
  const errors: any = {}
  const requiredFields = ['email', 'password']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Некорректный email'
  }
  return errors
}
