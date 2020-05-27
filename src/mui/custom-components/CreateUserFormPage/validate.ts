export const validate = (values: any) => {
  const errors: any = {}
  const requiredFields = ['name']
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Обязательное поле'
    }
  })
  if (!values.name?.trim()) {
    errors.name = 'Поле не может быть пустым'
  }
  return errors
}
