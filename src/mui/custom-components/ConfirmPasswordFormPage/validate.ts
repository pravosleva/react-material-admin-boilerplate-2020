export const validate = (values: any) => {
  const errors: any = {}
  const requiredFields = ['password', 'password2']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  if (!values.password?.trim()) {
    errors.password = 'Поле не может быть пустым'
  }
  if (values.password !== values.password2) {
    errors.password2 = 'Указанные пароли не совпадают'
  }
  return errors
}
