import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { ErrorMessage } from 'components/ErrorMessage'
import { InputField } from 'components/InputField'
import { PasswordField } from 'components/PasswordField'
import { Text } from 'components/Text'
import { loginFormSchema } from 'features/authentication/types'
import { useMediaQuery } from 'hooks'
import { type FC, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { z } from 'zod'

type LoginSchema = z.infer<typeof loginFormSchema>

type Props = {
  isLoading: boolean
  onBack?: () => void
  onSubmit: (data: LoginSchema) => Promise<void>
}

export const LoginForm: FC<Props> = ({
  isLoading,
  onBack,
  onSubmit: _onSubmit,
}) => {
  const { t } = useTranslation()
  const { isSp } = useMediaQuery()
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginFormSchema),
  })

  const [isError, setIsError] = useState<boolean>(false)

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    try {
      await _onSubmit(data)
    } catch (error) {
      setIsError(true)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={{ maxWidth: 540, marginInline: 'auto', padding: 16 }}
    >
      <Text
        text={t('authentication.login')}
        as='div'
        size='TITLE'
        weight='BOLD'
        styles={{ marginBottom: 16 }}
      />
      {isError && <ErrorMessage text={t('authentication.error-on-login')} />}
      <InputField
        label={t('authentication.email')}
        name='email'
        control={control}
      />
      <PasswordField
        label={t('authentication.password')}
        name='password'
        control={control}
      />
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: isSp ? 'column-reverse' : undefined,
          gap: 16,
        }}
      >
        {onBack && (
          <Button
            label={t('previous')}
            variant='outlined'
            color='primary'
            styles={
              !isSp
                ? { marginLeft: 'auto' }
                : { width: isSp ? '100%' : undefined }
            }
            onClick={onBack}
          />
        )}
        <Button
          label={t('next')}
          variant='contained'
          color='primary'
          disabled={!isValid}
          loading={isLoading}
          styles={
            !isSp
              ? { marginLeft: 'auto' }
              : { width: isSp ? '100%' : undefined }
          }
          type='submit'
        />
      </div>
    </form>
  )
}
