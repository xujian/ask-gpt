import React from 'react'
import { Box, Button, Modal, ModalDialog, Typography } from '@mui/joy'
import { Session } from './types'
import { useTranslation } from 'react-i18next'

interface Props {
  open: boolean
  session: Session
  save(session: Session): void
  close(): void
}

export default function CleanWindow(props: Props) {
  const { t } = useTranslation()
  const onCancel = () => {
    props.close()
  }

  return (
    <Modal open={props.open} onClose={onCancel}>
      <ModalDialog>
        <Typography>{t('clean')}</Typography>
        <Typography>
          {t('this action will permanently delete all non-system messages in')} [{props.session.name}] {t('clean alert end')}
          {t('are you sure you want to continue?')}
        </Typography>
        <Box>
          <Button onClick={props.close}>{t('cancel')}</Button>
          <Button>{t('clean it up')}</Button>
        </Box>
      </ModalDialog>
    </Modal>
  )
}
