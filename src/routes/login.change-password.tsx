import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@remix-run/react'
import { Button } from 'components/Button'
import { ErrorMessage } from 'components/ErrorMessage'
import { Loading } from 'components/Loading'
import { PasswordField } from 'components/PasswordField'
import { Text } from 'components/Text'
import { useMe, useUpdateMyPassword } from 'features/authentication/api/user'
import {
  changePasswordFormSchema,
  changePasswordRequestSchema,
} from 'features/authentication/types'
import { onChangeLoginStatus } from 'features/authentication/utils/login'
import { useMyCompanyList } from 'features/company/api/company'
import { useMediaQuery } from 'hooks'
import Layout from 'layout/Login'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { z } from 'zod'

type ChangePasswordSchema = z.infer<typeof changePasswordFormSchema>

export default function ChangePassword() {
  const { t } = useTranslation()
  const { isSp } = useMediaQuery()
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ChangePasswordSchema>({
    defaultValues: { password: '', passwordConfirm: '' },
    resolver: zodResolver(changePasswordFormSchema),
  })
  const me = useMe()
  const myCompanies = useMyCompanyList()
  const { mutateAsync: updateMyPassword, isPending } = useUpdateMyPassword()

  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    onChangeLoginStatus({
      navigate,
      me: me.data,
      myCompanies: myCompanies.data,
    })
  }, [me.data, myCompanies.data])

  const onSubmit: SubmitHandler<ChangePasswordSchema> = async (data) => {
    try {
      await updateMyPassword(changePasswordRequestSchema.parse(data))
      if (myCompanies.data && myCompanies.data.length > 0) {
        await navigate('/')
        return
      }
      await navigate('/create-company')
    } catch (error) {
      setIsError(true)
    }
  }
  return (
    <Layout title={t('title.change-password')} canLogout>
      {me.isLoading || myCompanies.isLoading ? (
        <Loading />
      ) : (
        <div
          css={{
            marginBlock: isSp ? 'auto' : undefined,
            marginInline: isSp ? 16 : 40,
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            css={{ maxWidth: 500, margin: '0 auto' }}
          >
            <Text
              text={t('authentication.set-new-password')}
              as='p'
              size='TITLE'
              weight='BOLD'
            />
            {isError && (
              <ErrorMessage
                text={t('authentication.error-on-change-password')}
              />
            )}
            <PasswordField
              label={t('authentication.new-password')}
              name='password'
              control={control}
            />
            <PasswordField
              label={t('authentication.new-password-confirm')}
              name='passwordConfirm'
              control={control}
            />
            <div css={{ display: 'flex', alignItems: 'center' }}>
              <Button
                label={t('next')}
                variant='contained'
                color='primary'
                disabled={!isValid}
                loading={isPending}
                type='submit'
                styles={{ width: isSp ? '100%' : undefined }}
              />
            </div>
          </form>
        </div>
      )}
    </Layout>
  )
}
