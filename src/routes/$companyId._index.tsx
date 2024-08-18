import { Stack } from '@mui/material'
import { useNavigate } from '@remix-run/react'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { TitleBox } from 'components/TitleBox'
import Layout from 'layout/Main'
import { useTranslation } from 'react-i18next'
import { $path } from 'remix-routes'
import { colorMap } from 'utils/color'

const Home = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <Layout activePage='home'>
      <TitleBox title={t('title.home')} backgroundColor='BASE_PALE' />
      <Stack
        spacing={2}
        css={{
          alignItems: 'center',
          padding: 16,
          backgroundColor: colorMap.WHITE,
          margin: 32,
          borderRadius: 8,
          gap: 16,
        }}
      >
        <Text text={t('title.description')} as='div' />
        <Button
          label={t('company.create-new-company')}
          variant='contained'
          color='primary'
          onClick={() => {
            navigate($path('/create-company'))
          }}
        />
      </Stack>
    </Layout>
  )
}

export default Home
