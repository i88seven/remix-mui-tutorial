import ReplayIcon from '@mui/icons-material/Replay'
import { Fab } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import { useMediaQuery } from 'hooks'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colorMap } from 'utils/color'
import { Loading } from './Loading'

export const FloatingReloadButton: FC = () => {
  const { t } = useTranslation()
  const { isSp } = useMediaQuery()
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Fab
      sx={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        backgroundColor: colorMap.WHITE,
      }}
      aria-label='reload'
      color='default'
      size={isSp ? 'medium' : 'large'}
      onClick={async () => {
        if (isLoading) {
          return
        }
        setIsLoading(true)
        await queryClient.invalidateQueries({
          refetchType: 'active',
        })
        setIsLoading(false)
      }}
    >
      {isLoading ? <Loading size='2rem' marginTop='0.5rem' /> : <ReplayIcon />}
    </Fab>
  )
}
