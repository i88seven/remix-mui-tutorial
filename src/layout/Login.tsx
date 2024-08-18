import LogoutIcon from '@mui/icons-material/Logout'
import { Box, Grid } from '@mui/material'
import { useNavigate } from '@remix-run/react'
import { Button } from 'components/Button'
import { useLogout } from 'features/authentication/api/user'
import { useMediaQuery } from 'hooks'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

type Props = {
  children: ReactNode
  title: string
  canLogout?: boolean
}

export default function Login({ children, canLogout }: Props) {
  const { t } = useTranslation()
  const { isSp } = useMediaQuery()
  const navigate = useNavigate()
  const { mutate: logout } = useLogout()

  return (
    <div css={{ height: '100vh' }}>
      <Grid container css={{ height: '100vh' }}>
        <Grid item css={{ flex: 1 }}>
          <Box
            sx={{
              padding: '16px 24px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <img
              src='/images/logo.svg'
              alt='Logo'
              width={116}
              height={48}
              css={{ marginInline: 'auto' }}
            />
            {canLogout && (
              <Button
                label={t('authentication.logout')}
                variant='text'
                color='primary'
                size='small'
                startIcon={<LogoutIcon />}
                onClick={() => {
                  logout()
                  navigate('/login')
                }}
                styles={
                  isSp
                    ? {
                        position: 'absolute',
                        right: 16,
                      }
                    : {}
                }
              />
            )}
          </Box>
          <main
            css={{
              display: isSp ? 'grid' : undefined,
              height: 'calc(100% - 64px)',
            }}
          >
            {children}
          </main>
        </Grid>
      </Grid>
    </div>
  )
}
