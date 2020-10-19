import React, { useContext, useState, useEffect } from 'react'
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
import Prism from 'prismjs'
// @ts-ignore Cannot find module './CODE_SAMPLES.md' or its corresponding type declarations.
import codeSamplesMD from './CODE_SAMPLES.md'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { Link } from 'react-router-dom'

const toolbarMenu1Item: IToolbarMenuItem = toolbarMenu.find(({ path }: IToolbarMenuItem) => path === '/training')

const toolbarMenuItem: IToolbarMenuItem = toolbarMenu1Item.sublist.find(
  ({ path }: IToolbarMenuItem) => path === '/training/state'
)
const toolbarMenuItemSublist = toolbarMenuItem.sublist || []

export const State = withRouter(({ history }) => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState<string | false>(false)
  const handleChange = (panel: string) => (_event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }
  const goToPage = (path: string): void => {
    history.push(path)
  }
  const [codeSamples, setCodeSamples] = useState('')
  const [isCodeSamplesLoaded, setIsCodeSamplesLoaded] = useState(false)
  useEffect(() => {
    fetch(codeSamplesMD)
      .then((res) => res.text())
      .then((md) => {
        setCodeSamples(md)
        setIsCodeSamplesLoaded(true)
        // You can call the Prism.js API here
        // Use setTimeout to push onto callback queue so it runs after the DOM is updated
        setTimeout(() => {
          Prism.highlightAll()
        }, 0)
      })
  }, [])
  // {isCodeSamplesLoaded ? <ReactMarkdown source={codeSamples} /> : <h1>Please wait...</h1>}

  return (
    <Container>
      <h1>
        <Link className={classes.noTextDecoration} to="/training">
          {t('TRAINING')}
        </Link>{' '}
        | {t('STATE')}
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={5}>
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
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={7}>
          <Paper className={classes.paper}>
            {isCodeSamplesLoaded ? <ReactMarkdown source={codeSamples} /> : <h1>Please wait...</h1>}
          </Paper>
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
})
