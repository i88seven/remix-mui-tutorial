import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from 'components/Button'
import { InputField } from 'components/InputField'
import { SelectField } from 'components/SelectField'
import {
  useCompanyTypeList,
  usePrefectureList,
  useUpdateCompany,
} from 'features/company/api/company'
import {
  type companySchema,
  companyUpdateFormSchema,
  companyUpdateRequestSchema,
} from 'features/company/types'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import type { z } from 'zod'

type Company = z.infer<typeof companySchema>
type FormSchema = z.infer<typeof companyUpdateFormSchema>

type Props = {
  company: Company
  onCancel: () => void
  onAfterSubmit: () => void
}

export const CompanyForm: React.FC<Props> = ({
  company,
  onCancel,
  onAfterSubmit,
}) => {
  const { t } = useTranslation()
  const companyTypeList = useCompanyTypeList()
  const prefectureList = usePrefectureList()
  const { mutateAsync: updateCompany, isPending } = useUpdateCompany()

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormSchema>({
    defaultValues: {
      name: company.name,
      companyTypeId: company.companyTypeId,
      prefectureId: company.prefectureId,
    },
    resolver: zodResolver(companyUpdateFormSchema),
  })

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    await updateCompany(
      companyUpdateRequestSchema.parse({
        ...data,
        id: company.id,
      })
    )
    onAfterSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} css={{ margin: '0 auto' }}>
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
      <div css={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <Button
          label={t('cancel')}
          variant='outlined'
          color='primary'
          size='small'
          onClick={onCancel}
        />
        <Button
          label={t('complete')}
          variant='contained'
          color='primary'
          size='small'
          disabled={!isValid}
          loading={isPending}
          type='submit'
        />
      </div>
    </form>
  )
}
