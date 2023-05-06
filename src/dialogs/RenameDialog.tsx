import React from 'react'
import { Button, Modal, ModalDialog, Input, Typography, Stack, Box } from '@mui/joy'
import { Session } from '../types'
import { useTranslation } from 'react-i18next'

const { useEffect } = React

interface Props {
  open: boolean
  session: Session
  close(): void
}

export default function RenameDialog (props: Props) {
  const { t } = useTranslation()
  const [dataEdit, setDataEdit] = React.useState<Session>(props.session)

  useEffect(() => {
    setDataEdit(props.session)
  }, [props.session])

  const onCancel = () => {
    props.close()
    setDataEdit(props.session)
  }

  const onSave = () => {
    if (dataEdit.name === '') {
      dataEdit.name = props.session.name
    }
    props.close()
  }

  return (
    <Modal open={props.open} onClose={onCancel}>
      <ModalDialog sx={{
        width: '400px',
      }}>
        <Stack direction="column" spacing={1}>
          <Typography>{t('rename')}</Typography>
          <Input
            fullWidth
            value={dataEdit.name}
            onChange={(e) => setDataEdit({ ...dataEdit, name: e.target.value.trim() })}
          />
          <Stack direction="row" spacing={1} sx={{
            justifyContent: 'flex-end',
          }}>
            <Button onClick={onCancel} size="sm" color="neutral">{t('cancel')}</Button>
            <Button onClick={onSave} size="sm">{t('save')}</Button>
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  )
}
