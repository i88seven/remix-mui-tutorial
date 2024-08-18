import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@remix-run/react'
import { Button } from 'components/Button'
import { InputField } from 'components/InputField'
import { Loading } from 'components/Loading'
import { SelectField } from 'components/SelectField'
import { Text } from 'components/Text'
import { useMe } from 'features/authentication/api/user'
import { PrivacyPolicyAndTermsDialog } from 'features/authentication/components'
import {
  useCompanyTypeList,
  useCreateCompany,
  useMyCompanyList,
  usePrefectureList,
} from 'features/company/api/company'
import {
  companyCreateFormSchema,
  companyCreateRequestSchema,
} from 'features/company/types'
import { useMediaQuery } from 'hooks'
import Layout from 'layout/Login'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { $path } from 'remix-routes'
import type { z } from 'zod'

type FormSchema = z.infer<typeof companyCreateFormSchema>

export default function RegisterCompany() {
  const { t } = useTranslation()
  const { isSp } = useMediaQuery()
  const navigate = useNavigate()
  const companyTypeList = useCompanyTypeList()
  const prefectureList = usePrefectureList()
  const me = useMe()
  const myCompanies = useMyCompanyList()
  const { mutateAsync: postCompany, isPending } = useCreateCompany()
  const [isOpenPrivacyPolicy, setIsOpenPrivacyPolicy] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormSchema>({
    defaultValues: {
      name: '',
      companyTypeId: '',
      prefectureId: '',
    },
    resolver: zodResolver(companyCreateFormSchema),
  })

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    await postCompany(companyCreateRequestSchema.parse(data))
    navigate($path('/'))
  }

  return (
    <Layout title={t('company.create')} canLogout>
      {me.isLoading || myCompanies.isLoading ? (
        <Loading />
      ) : (
        <div
          css={{
            marginBlock: isSp ? 'auto' : 16,
            marginInline: isSp ? 16 : 40,
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            css={{ maxWidth: 400, margin: '0 auto 24px' }}
          >
            <div css={{ textAlign: 'center' }}>
              <Text
                text={t('company.create-new-company')}
                as='p'
                size='TITLE'
                weight='BOLD'
              />
            </div>
            <InputField
              label={t('company.name')}
              name='name'
              placeholder={t('example.company.name')}
              control={control}
            />
            {(companyTypeList.data ?? []).length > 1 && (
              <SelectField
                label={t('company.company-type')}
                name='companyTypeId'
                control={control}
                options={companyTypeList.data}
              />
            )}
            {prefectureList.data && prefectureList.data.length > 0 && (
              <SelectField
                label={t('company.prefecture')}
                name='prefectureId'
                control={control}
                options={prefectureList.data}
              />
            )}
            <Button
              label={t('next')}
              variant='contained'
              color='primary'
              disabled={!isValid}
              loading={isPending}
              type='submit'
              styles={{ width: isSp ? '100%' : undefined }}
            />
          </form>
        </div>
      )}
      <PrivacyPolicyAndTermsDialog
        isOpen={isOpenPrivacyPolicy}
        onClose={() => {
          setIsOpenPrivacyPolicy(false)
        }}
      />
    </Layout>
  )
}
