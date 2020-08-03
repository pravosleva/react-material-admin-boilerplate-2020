import React, { useContext } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'
import { useStyles } from './styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { toolbarMenu, IToolbarMenuItem } from '@/mui/layouts/dashboard/toolbar-menu'
import { getModifiedPhraseForTranslate } from '@/utils/multilingual/getModifiedPhraseForTranslate'
import ReactMarkdown from 'react-markdown'
import { withRouter } from 'react-router-dom'

const toolbarMenuItem: IToolbarMenuItem = toolbarMenu.find(({ path }: IToolbarMenuItem) => path === '/training')
const toolbarMenuItemSublist = toolbarMenuItem.sublist || []

export const Training = withRouter(({ history }) => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const handleChange = (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  const goToPage = (path: string): void => {
    history.push(path)
  }

  return (
    <Container>
      <h1>{t('TRAINING')}</h1>
      <div className={classes.root}>
        {toolbarMenuItemSublist.map(({ path, options: { text, noTranslate, title, description } }, i) => (
          <Accordion key={path || i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${i}bh-content`}
              id={`panel${i}bh-header`}
            >
              <Typography className={classes.heading}>
                {i + 1}. {noTranslate ? text : t(getModifiedPhraseForTranslate(text))}
              </Typography>
              {!!title && <Typography className={classes.secondaryHeading}>{title}</Typography>}
            </AccordionSummary>
            <Divider />
            <AccordionDetails className={classes.details}>
              <Typography>
                {!!description ? (
                  <ReactMarkdown
                    renderers={{ paragraph: ({ children }) => <span>{children}</span> }}
                    source={t(description)}
                  />
                ) : (
                  t('DESCRIPTION_IN_PROGRESS')
                )}
              </Typography>
            </AccordionDetails>
            <Divider />
            <AccordionActions>
              <Button size="small" onClick={() => goToPage(path)}>
                {t('READ_MORE')}
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </div>
      <ProTip />
    </Container>
  )
})
