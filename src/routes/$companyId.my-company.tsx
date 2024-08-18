import { Divider, Paper, Stack } from '@mui/material'
import { Button } from 'components/Button'
import { Text } from 'components/Text'
import { TitleBox } from 'components/TitleBox'
import {
  useCompany,
  useCompanyTypeList,
  usePrefectureList,
} from 'features/company/api/company'
import { CompanyForm } from 'features/company/components/CompanyForm'
import { useCompanyId } from 'hooks'
import Layout from 'layout/Main'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function MyCompany() {
  const { t } = useTranslation()
  const { companyId } = useCompanyId()
  const companyTypeList = useCompanyTypeList()
  const prefectureList = usePrefectureList()
  const company = useCompany({ companyId })
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const companyType = companyTypeList.data?.find((companyType) => {
    return company.data && companyType.id === company.data.companyTypeId
  })
  const prefecture = prefectureList.data?.find((prefecture) => {
    return company.data && prefecture.id === company.data.prefectureId
  })

  return (
    <Layout activePage='my_company'>
      <TitleBox title={company.data?.name ?? ''} backgroundColor='BASE_PALE' />
      {company.data && (
        <Stack css={{ margin: '1rem' }} spacing={2}>
          <div>
            <Paper
              css={{
                borderRadius: 16,
                padding: '1rem 2rem',
                maxWidth: 480,
                marginInline: 'auto',
              }}
            >
              <div css={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text
                  text={t('company.basic-information')}
                  as='div'
                  styles={{ marginTop: '0.5rem', marginBottom: '1rem' }}
                  size='SUBHEADER'
                  weight='BOLD'
                />
                {!isEdit && (
                  <Button
                    label={t('update')}
                    variant='contained'
                    color='primary'
                    size='small'
                    onClick={() => setIsEdit(true)}
                    styles={{ marginBottom: '1rem' }}
                  />
                )}
              </div>
              <Divider css={{ marginBottom: '1.5rem' }} />
              {isEdit ? (
                <CompanyForm
                  company={company.data}
                  onCancel={() => setIsEdit(false)}
                  onAfterSubmit={() => {
                    setIsEdit(false)
                  }}
                />
              ) : (
                <>
                  <Text
                    text={t('company.name')}
                    as='div'
                    size='BODY'
                    weight='BOLD'
                    styles={{ marginBottom: 8 }}
                  />
                  <div css={{ marginBottom: '1.5rem' }}>
                    <Text
                      text={company.data?.name ?? ''}
                      as='div'
                      size='BODY'
                    />
                  </div>
                  {companyType && (
                    <>
                      <Text
                        text={t('company.company-type')}
                        as='div'
                        size='BODY'
                        weight='BOLD'
                        styles={{ marginBottom: 8 }}
                      />
                      <Text
                        text={companyType.name}
                        as='div'
                        size='BODY'
                        styles={{ marginBottom: '1.5rem' }}
                      />
                    </>
                  )}
                  <Text
                    text={t('company.prefecture')}
                    as='div'
                    size='BODY'
                    weight='BOLD'
                    styles={{ marginBottom: 8 }}
                  />
                  <div css={{ marginBottom: '1rem' }}>
                    <Text text={prefecture?.name ?? ''} as='div' size='BODY' />
                  </div>
                </>
              )}
            </Paper>
          </div>
        </Stack>
      )}
    </Layout>
  )
}
