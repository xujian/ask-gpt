import { ChatCompletionRequestMessage } from 'openai'
import { createMessage, Message } from './types'
import { Settings } from './types'
import * as wordCount from './utils'

export type ApiPostParameter = {
  message: string,
  settings: Settings,
}

export async function post ({
  message,
  settings,
}: ApiPostParameter) {
  const { model, openaiKey, apiHost } = settings
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${openaiKey}`,
  }
  const body = {
    model,
    messages: [{
      role: 'user',
      content: message,
    }]
  }

  return new Promise<Message>((resolve, reject) => {
    fetch(`${apiHost}/v1/chat/completions`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).then(response => response.json()).then(data => {
      const {choices: [reply]} = data
      resolve(reply.message)
    })
    .catch(error => {
      console.log(error);
    })
  })
}

export async function replay(
  apiKey: string,
  host: string,
  maxContextSize: string,
  maxTokens: string,
  modelName: string,
  msgs: Message[],
  onText?: (text: string) => void,
  onError?: (error: Error) => void,
) {
  if (msgs.length === 0) {
    throw new Error('No messages to replay')
  }
  const head = msgs[0].role === 'system' ? msgs[0] : undefined
  if (head) {
    msgs = msgs.slice(1)
  }

  const maxTokensNumber = Number(maxTokens)
  const maxLen = Number(maxContextSize)
  let totalLen = head ? wordCount.estimateTokens(head.content) : 0

  let prompts: Message[] = []
  for (let i = msgs.length - 1; i >= 0; i--) {
    const msg = msgs[i]
    const msgTokenSize: number = wordCount.estimateTokens(msg.content) + 100 // 100 作为预估的误差补偿
    if (msgTokenSize + totalLen > maxLen) {
      break
    }
    prompts = [msg, ...prompts]
    totalLen += msgTokenSize
  }
  if (head) {
    prompts = [head, ...prompts]
  }

  try {
    const messages: ChatCompletionRequestMessage[] = prompts.map((msg) => ({ role: msg.role, content: msg.content }))
    const response = await fetch(`${host}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        model: modelName,
        max_tokens: maxTokensNumber,
        // stream: true,
      }),
    })
    const {choices: [reply]} = await response.json()
    onText && onText(reply.message.content)
  } catch (e: any) {
    onError && onError(e)
  }
}
