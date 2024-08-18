import { useParams } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import invariant from 'tiny-invariant'

export const useCompanyId = () => {
  const { t } = useTranslation()
  const { companyId } = useParams()
  invariant(companyId, t('invalid-path-error'))
  return { companyId }
}

export const useId = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  invariant(id, t('invalid-path-error'))
  return { id }
}
