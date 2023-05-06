import React from 'react'
import { useEffect, useState, useRef, useMemo } from 'react'
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai'
import Box from '@mui/joy/Box'
import Avatar from '@mui/joy/Avatar'
import { Menu, MenuProps, IconButton, ListItem, ListItemDecorator, ListItemContent } from '@mui/joy'
import MarkdownIt from 'markdown-it'
import mdKatex from '@traptitech/markdown-it-katex'
import hljs from 'highlight.js'
import 'katex/dist/katex.min.css'
import PersonIcon from '@heroicons/react/24/solid/UserCircleIcon'
import ChipIcon from '@heroicons/react/24/solid/CpuChipIcon'
import SettingsIcon from '@heroicons/react/24/solid/CogIcon'
import MoreVertIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon'
import * as wordCount from '../utils'
import 'github-markdown-css/github-markdown-light.css'
import mila from 'markdown-it-link-attributes'
import { useTranslation } from 'react-i18next'

const md = new MarkdownIt({
  linkify: true,
  breaks: true,
  highlight: (str: string, lang: string, attrs: string): string => {
    let content = str
    if (lang && hljs.getLanguage(lang)) {
      try {
        content = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
      } catch (e) {
        console.log(e)
        return str
      }
    } else {
      content = md.utils.escapeHtml(str)
    }
    // join actions html string
    lang = (lang || 'txt').toUpperCase()
    return [
      '<div class="code-block-wrapper">',
      `<div class="code-header"><span class="code-lang">${lang}</span><div class="copy-action">Copy</div></div>`,
      '<pre class="hljs code-block">',
      `<code>${content}</code>`,
      '</pre>',
      '</div>',
    ].join('')
  },
})
md.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })
md.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })

export type Message = ChatCompletionRequestMessage & {
  id: string
}

export interface Props {
  id?: string
  message: Message
  hasWordCount?: boolean
  hasTokenCount?: boolean
  hasModelName?: boolean
  modelName: string
  onMenuCall: (id: string) => void
}

function Item (props: Props) {
  const { t } = useTranslation()
  const { message } = props
  const [isHovering, setIsHovering] = useState(false)
  const onOptionsClick = (id: string) => {
    props.onMenuCall(id)
  }

  const tips: string[] = []
  if (props.hasModelName) {
    tips.push(`model: ${props.modelName}`)
  }
  if (props.hasWordCount) {
    tips.push(`word count: ${wordCount.countWord(message.content)}`)
  }
  if (props.hasTokenCount) {
    tips.push(`token estimate: ${wordCount.estimateTokens(message.content)}`)
  }

  return (
    <ListItem
      id={`message-${props.id}`}
      className="message-item"
      key={message.id}
      onMouseEnter={() => {
        setIsHovering(true)
      }}
      onMouseOver={() => {
        setIsHovering(true)
      }}
      onMouseLeave={() => {
        setIsHovering(false)
      }}
      sx={{
        padding: '12px 18px',
        alignItems: 'flex-start'
      }}
      endAction={
        <IconButton
          id={`message-actions-button-${message.id}`}
          className="message-actions-button"
          aria-label="more"
          size="sm"
          variant="plain"
          data-message-id={props.id}
          aria-haspopup="true"
          onClick={() => onOptionsClick(message.id)}>
          <MoreVertIcon />
        </IconButton>
      }>
      <ListItemDecorator>
        <Avatar size="sm" color="primary" variant="soft">
        {
          {
            assistant: (<ChipIcon />),
            user: (<PersonIcon />),
            system: (<SettingsIcon />),
          }[message.role]
        }
        </Avatar>
      </ListItemDecorator>
      <ListItemContent
        className="message-content" sx={{
        margin: 0,
        mr: 6,
        '& .hljs': {
          padding: '1em',
          borderRadius: '14px',
        }
      }}>
        <Box className="content" sx={{
          '& p': {
            margin: 0,
          }
        }}
          dangerouslySetInnerHTML={{ __html: md.render(message.content) }} />
      </ListItemContent>
    </ListItem>
  )
}

export default function Block(props: Props) {
  return useMemo(() => {
    return <Item {...props} />
  }, [props.message, props.hasWordCount, props.hasTokenCount, props.hasModelName, props.modelName])
}
