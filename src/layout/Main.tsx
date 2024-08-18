import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useNavigate } from '@remix-run/react'
import { FloatingReloadButton } from 'components/FloatingReloadButton'
import { Loading } from 'components/Loading'
import { Text } from 'components/Text'
import { useLogout, useMe } from 'features/authentication/api/user'
import { PrivacyPolicyAndTermsDialog } from 'features/authentication/components'
import { SidebarCompanyMenu } from 'features/authentication/components/SidebarCompanyMenu'
import { useCompany, useMyCompanyList } from 'features/company/api/company'
import { useCompanyId, useMediaQuery, useWindowSize } from 'hooks'
import { useDrawerContext } from 'providers'
import type React from 'react'
import { type ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { SidebarItemKeys } from 'types/sidebar'
import { colorMap } from 'utils/color'
import { sidebarItemKeys } from 'utils/sidebar'

type Props = {
  children: ReactNode
  activePage: SidebarItemKeys | 'administration' | 'my_company'
}

export default function Main({ children, activePage }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { height } = useWindowSize()
  const { isSp } = useMediaQuery()
  const { companyId } = useCompanyId()
  const iconElement = (key: SidebarItemKeys): React.ReactElement => {
    switch (key) {
      case 'home':
        return <HomeIcon />
    }
  }
  const routerMap: Record<SidebarItemKeys, string> = {
    home: `/${companyId}`,
  }

  const user = useMe()
  const myCompanies = useMyCompanyList()
  const company = useCompany({ companyId })
  const { mutate: logoutAsync } = useLogout()
  const [isOpenPrivacyPolicy, setIsOpenPrivacyPolicy] = useState(false)
  const { open, setOpen } = useDrawerContext()

  useEffect(() => {
    if (!user.isFetched || user.isError || user.isFetching || !user.data) {
      return
    }
    if (
      !myCompanies.isFetched ||
      myCompanies.isError ||
      myCompanies.isFetching ||
      !myCompanies.data
    ) {
      return
    }
    if (user.data.isPasswordChanged === false) {
      navigate('/login/change-password')
      setOpen(false)
    }
    if (myCompanies.data.length === 0) {
      navigate('/create-company')
      setOpen(false)
    }
    if (
      companyId &&
      !myCompanies.data.some((myCompany) => myCompany.id === companyId)
    ) {
      navigate('/')
      setOpen(false)
    }
  }, [user.isFetched, myCompanies.isFetched])
  const isActiveCompany = activePage === 'my_company'

  if (company.isLoading) return <Loading />

  const logout = async () => {
    logoutAsync()
    await navigate('/login')
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        open={open}
        variant={isSp ? 'temporary' : 'permanent'}
        onClose={() => {
          setOpen(false)
        }}
        sx={{
          width: 216,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 216,
            boxSizing: 'border-box',
          },
        }}
      >
        <img src='/images/logo.svg' alt='Logo' width={215} height={67} />
        <List>
          {sidebarItemKeys.map((sidebarItemKey) => {
            const isActive = activePage === sidebarItemKey
            return (
              <ListItem key={sidebarItemKey} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={() => {
                    navigate(routerMap[sidebarItemKey])
                    setOpen(false)
                  }}
                  sx={
                    isActive
                      ? { borderRight: `4px solid ${colorMap.PRIMARY}` }
                      : {}
                  }
                >
                  <ListItemIcon>{iconElement(sidebarItemKey)}</ListItemIcon>
                  <ListItemText
                    primary={t(`title.${sidebarItemKey}`)}
                    primaryTypographyProps={
                      isActive
                        ? {
                            fontWeight: 'bold',
                          }
                        : {}
                    }
                    sx={{
                      color: isActive ? colorMap.PRIMARY : 'inherit',
                      marginBottom: 0,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
        <div
          css={{
            position: height >= 480 ? 'fixed' : 'initial',
            bottom: 0,
            width: 215,
            textAlign: 'center',
          }}
        >
          <div css={{ paddingLeft: 24 }}>
            <Divider sx={{ width: 168 }} />
          </div>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setIsOpenPrivacyPolicy(true)
                }}
              >
                <ListItemText
                  primary={
                    <Text
                      text={t('authentication.privacy-policy-and-terms')}
                      size='MINI_CAPTION'
                    />
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                selected={isActiveCompany}
                onClick={() => {
                  navigate(`/${companyId}/my-company`)
                  setOpen(false)
                }}
                sx={
                  isActiveCompany
                    ? { color: `4px solid ${colorMap.PRIMARY}` }
                    : {}
                }
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary={t('title.company-setting')}
                  primaryTypographyProps={
                    isActiveCompany
                      ? {
                          fontWeight: 'bold',
                        }
                      : {}
                  }
                  sx={{
                    color: isActiveCompany ? colorMap.PRIMARY : 'inherit',
                    marginBottom: 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <SidebarCompanyMenu
                options={[
                  ...(myCompanies.data ?? []).map((myCompany) => ({
                    id: myCompany.id,
                    name: myCompany.name,
                  })),
                  {
                    id: 'logout',
                    name: t('authentication.logout'),
                  },
                ]}
                onSelect={async (value) => {
                  if (value === 'logout') {
                    await logout()
                    return
                  }
                  await navigate(`/${value}`)
                }}
              />
            </ListItem>
          </List>
        </div>
      </Drawer>
      <PrivacyPolicyAndTermsDialog
        isOpen={isOpenPrivacyPolicy}
        onClose={() => {
          setIsOpenPrivacyPolicy(false)
        }}
      />
      <main
        css={{
          width: isSp ? '100%' : 'calc(100% - 216px)',
          minHeight: '100vh',
          backgroundColor: colorMap.BASE_PALE,
        }}
      >
        {company.isLoading || user.isLoading ? <Loading /> : children}
        <FloatingReloadButton />
      </main>
    </Box>
  )
}
