const getNameByTemplate = (str: string) => str.slice(1, str.length - 1)

export const getSeparatedRoutesForLayouts = ({ routes, templates = [] }) => {
  const result = {}
  const hasNotInTemplates = (route: any) => !templates.some((t) => route.path.slice(0, t.length) === t)

  if (templates.length > 0) {
    templates.forEach((template) => {
      const hasInTemplates = (route: any) => route.path.slice(0, template.length) === template

      if (routes.some(hasInTemplates)) {
        result[`${[getNameByTemplate(template)]}Routes`] = routes.filter(
          (e: any) => e.path.slice(0, template.length) === template
        )
      }
    })
  }

  if (routes.some(hasNotInTemplates)) {
    result['mainRoutes'] = routes.filter(hasNotInTemplates)
  }

  return result
}

/*
ABOUT: Хитрая функция, требующая описания.

CALL EXAMPLE:
getSeperatedRoutesForLayouts({ routes, templates: ['/auth/'] })

OUTPUT:
{
  authRoutes: <Array>,
  mainRoutes: <Array>,
}

OUTPUT DESCR:
{
  `${<item as template без первого и последнего символов>}Routes`: [], // Все что отфильтровано по templates[item]
  mainRoutes: [], // Все (если оно есть), что не попадает ни под один из templates
}
*/
