import React, { useState } from 'react'
import {
  Select,
  Typography,
  Modal,
  FormLabel,
  Option,
  ModalDialog,
  ModalClose,
  Switch,
  Stack,
  FormControl,
  IconButton,
  Sheet
} from '@mui/joy'
import { Input } from '@mui/joy'
import { Settings } from '../types'
import ClearIcon from '@heroicons/react/24/solid/XMarkIcon'
import { useTranslation } from 'react-i18next'
import { useSettings, save as saveSettings } from '../store'
import { useAppDispatch } from '../store/hooks'
const models: string[] = ['gpt-3.5-turbo', 'gpt-3.5-turbo-0301', 'gpt-4', 'gpt-4-0314', 'gpt-4-32k', 'gpt-4-32k-0314']
const languages: string[] = ['en', 'zh-Hans', 'zh-Hant']
const languageMap: { [key: string]: string } = {
  en: 'English',
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
}
interface Props {
  open: boolean
  close(): void
}

export default function SettingsDialog(props: Props) {
  const { value } = useSettings()
  console.log('SettingsDialog useSettings.......', value)
  const [settings, setSettings] = useState<Settings>(() => value),
    dumpSettings = (key: keyof Settings, v: any) => {
      setSettings({
        ...settings,
        [key]: v
      })
    }
  console.log('SettingsDialog useSettings.......settings', settings)
  let {
    openaiKey,
    language,
    model
  } = settings
  console.log('SettingsDialog openaiKey.......', openaiKey)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [settingsEdit, setSettingsEdit] = React.useState<Settings>(settings)
  const handleRepliesTokensSliderChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (newValue === 8192) {
      setSettingsEdit({ ...settingsEdit, maxTokens: 'inf' })
    } else {
      setSettingsEdit({ ...settingsEdit, maxTokens: newValue.toString() })
    }
  }

  const onCancel = () => {
    props.close()
  }

  return (
    <Modal open={props.open} onClose={onCancel}>
      <ModalDialog sx={{
        width: '80%',
        maxWidth: 680,
        minWidth: 480,
      }}>
        <ModalClose />
        <Typography sx={{
          mb: 2,
        }}>{t('settings')}</Typography>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Open AI APIKey</FormLabel>
            <Input size="sm" variant="soft"
              endDecorator={<IconButton><ClearIcon /></IconButton>}
              value={openaiKey}
              onChange={e => dumpSettings('openaiKey', e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Language</FormLabel>
            <Select size="sm" variant="soft"
              value={language}>
              {languages.map((language) => (
                <Option key={language} value={language}>
                  {languageMap[language]}
                </Option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Model</FormLabel>
            <Select size="sm" variant="soft"
              value={language}>
              {models.map((model) => (
                <Option key={model} value={model}>
                  {model}
                </Option>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}