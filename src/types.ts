import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum } from 'openai'
import { v4 as uuidv4 } from 'uuid'

export type ColorMode = 'dark' | 'light'

export type Message = ChatCompletionRequestMessage & {
  id: string
}

export interface Session {
  id: string
  name: string
  model: string
}

export function createSession(name: string = 'New chat'): Session {
  return {
    id: uuidv4(),
    name: name,
    model: 'gpt-3.5-turbo',
  }
}

export function createMessage(role: ChatCompletionRequestMessageRoleEnum = ChatCompletionRequestMessageRoleEnum.User, content: string = ''): Message {
  return {
    id: uuidv4(),
    content: content,
    role: role,
  }
}

export interface Settings {
  openaiKey: string
  apiHost: string
  model: string
  maxContextSize: string
  maxTokens: string
  showWordCount?: boolean
  showTokenCount?: boolean
  showModelName?: boolean
  language: string
}

