export const isCurrentPath = (browserLink: string, appLink: string) => {
  return (
    browserLink === appLink ||
    (browserLink[browserLink.length - 1] === '/' && browserLink.slice(0, -1) === appLink) ||
    (appLink[appLink.length - 1] === '/' && appLink.slice(0, -1) === browserLink) ||
    (browserLink.split('/').length > 2 &&
      browserLink.split('/').length === appLink.split('/').length + 1 &&
      browserLink.split('/')[2] === appLink.split('/')[2])
  )
}
