import { Dialog } from '@mui/material'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { colorMap } from 'utils/color'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const PrivacyPolicyAndTermsDialog: FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useTranslation()

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        onClose()
      }}
    >
      <div css={{ marginInline: 24, marginBlock: 12, whiteSpace: 'pre-wrap' }}>
        <Text
          text={t('authentication.privacy-policy')}
          as='p'
          size='BODY'
          weight='BOLD'
        />
        <Text
          text={t('authentication.privacy-policy-content')}
          as='p'
          size='CAPTION'
        />
        <Text
          text={t('authentication.terms')}
          as='p'
          size='BODY'
          weight='BOLD'
        />
        <Text text={t('authentication.terms-content')} as='p' size='CAPTION' />
      </div>
      <div
        css={{
          width: '100%',
          position: 'sticky',
          backgroundColor: colorMap.WHITE,
          height: 72,
          textAlign: 'center',
          bottom: 0,
        }}
      >
        <div css={{ paddingBlock: 12 }}>
          <Button
            label={t('close')}
            variant='outlined'
            color='info'
            onClick={() => {
              onClose()
            }}
          />
        </div>
      </div>
    </Dialog>
  )
}
