import type { NavigateFunction } from '@remix-run/react'
import type { User } from 'features/authentication/types'
import type { companySchema } from 'features/company/types'
import type { z } from 'zod'

type Company = z.infer<typeof companySchema>

export const onChangeLoginStatus = async ({
  navigate,
  me,
  myCompanies,
}: {
  navigate: NavigateFunction
  me?: User
  myCompanies?: Company[]
}) => {
  if (!me || !myCompanies) {
    return
  }
  if (me.isPasswordChanged === false) {
    await navigate('/login/change-password')
    return
  }
  if (myCompanies.length > 0) {
    await navigate('/')
    return
  }
  await navigate('/create-company')
}
