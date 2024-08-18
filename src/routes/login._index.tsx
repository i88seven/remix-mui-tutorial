import { useNavigate } from '@remix-run/react'
import { useMe, usePostToken } from 'features/authentication/api/user'
import { LoginForm } from 'features/authentication/components'
import { loginRequestSchema } from 'features/authentication/types'
import { onChangeLoginStatus } from 'features/authentication/utils/login'
import { useMyCompanyList } from 'features/company/api/company'
import { useMediaQuery } from 'hooks'
import Layout from 'layout/Login'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function Login() {
  const { t } = useTranslation()
  const { isSp } = useMediaQuery()
  const navigate = useNavigate()
  const me = useMe()
  const myCompanies = useMyCompanyList()
  const { mutateAsync: postToken, isPending } = usePostToken()

  useEffect(() => {
    onChangeLoginStatus({
      navigate,
      me: me.data,
      myCompanies: myCompanies.data,
    })
  }, [me.data, myCompanies.data])

  return (
    <Layout title={t('title.login')}>
      <div
        css={{
          marginBlock: isSp ? 'auto' : undefined,
          marginInline: isSp ? 16 : 40,
        }}
      >
        <LoginForm
          isLoading={isPending}
          onSubmit={async (data) => {
            await postToken(loginRequestSchema.parse(data))
          }}
        />
      </div>
    </Layout>
  )
}
