import { Card, Stack } from '@mui/material'
import type { MetaFunction } from '@remix-run/node'
import { useNavigate } from '@remix-run/react'
import { Button } from 'components/Button'
import { Loading } from 'components/Loading'
import { Text } from 'components/Text'
import { useMyCompanyList } from 'features/company/api/company'
import Layout from 'layout/Empty'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const meta: MetaFunction = () => {
  return [{ name: 'theme-color', content: '#ffffff' }]
}

export default function SelectCompany() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const myCompanies = useMyCompanyList()

  useEffect(() => {
    if (myCompanies.data?.length === 0) {
      navigate('/create-company')
    }
    if (myCompanies.data?.length === 1) {
      navigate(`/${myCompanies.data[0].id}`)
    }
  }, [myCompanies.data])

  if (myCompanies.isLoading || (myCompanies.data ?? [])?.length < 2) {
    return <Loading />
  }

  return (
    <Layout>
      <Stack
        spacing={3}
        css={{ alignItems: 'center', marginBlock: 32, marginInline: 40 }}
      >
        <Card css={{ width: 'max-content', margin: 'auto', padding: 28 }}>
          <Stack spacing={3} css={{ alignItems: 'center' }}>
            <Text
              text={t('authentication.select-company')}
              as='div'
              size='HEADLINE'
              weight='BOLD'
            />
            {myCompanies.data?.map((company) => (
              <div key={company.id} css={{ width: '100%' }}>
                <Button
                  label={company.name}
                  variant='outlined'
                  color='primary'
                  styles={{ width: '100%' }}
                  onClick={async () => {
                    await navigate(`/${company.id}`)
                  }}
                />
              </div>
            ))}
          </Stack>
        </Card>
      </Stack>
    </Layout>
  )
}
