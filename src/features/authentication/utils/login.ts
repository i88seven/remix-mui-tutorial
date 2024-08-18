import type { NavigateFunction } from '@remix-run/react'
import type { User } from 'features/authentication/types'
import type { companySchema } from 'features/company/types'
import { $path } from 'remix-routes'
import type { z } from 'zod'

type Company = z.infer<typeof companySchema>

export const onChangeLoginStatus = ({
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
    navigate($path('/login/change-password'))
    return
  }
  if (myCompanies.length > 0) {
    navigate($path('/'))
    return
  }
  navigate($path('/create-company'))
}
