import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  companyCreateRequestSchema,
  companySchema,
  companyTypeSchema,
  companyUpdateRequestSchema,
  prefectureSchema,
} from 'features/company/types'
import type { z } from 'zod'

type Prefecture = z.infer<typeof prefectureSchema>
type CompanyType = z.infer<typeof companyTypeSchema>
type Company = z.infer<typeof companySchema>

export const useCompanyTypeList = () => {
  return useQuery({
    queryKey: ['companyTypeList'],
    queryFn: async () => {
      return [
        {
          id: '1',
          name: '大企業',
        },
        {
          id: '2',
          name: '中小企業',
        },
      ] satisfies CompanyType[]
    },
  })
}

export const usePrefectureList = () => {
  return useQuery({
    queryKey: ['prefectureList'],
    queryFn: async () => {
      return [
        {
          id: '1',
          name: '石川県',
          nameKana: 'いしかわけん',
        },
        {
          id: '2',
          name: '富山県',
          nameKana: 'とやまけん',
        },
        {
          id: '3',
          name: '岐阜県',
          nameKana: 'ぎふけん',
        },
        {
          id: '4',
          name: '福井県',
          nameKana: 'ふくいけん',
        },
      ] satisfies Prefecture[]
    },
  })
}

export const useMyCompanyList = <T = Company[]>(
  select?: (data: Company[]) => T
) => {
  return useQuery({
    queryKey: ['myCompanyList'],
    queryFn: async () => {
      return JSON.parse(
        localStorage.getItem('company-list') ?? '[]'
      ) as Company[]
    },
    select,
  })
}

export const useCompany = ({ companyId }: { companyId: string }) => {
  return useMyCompanyList<Company | undefined>((data) =>
    data.find((company) => company.id === companyId)
  )
}

export const useCreateCompany = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: z.infer<typeof companyCreateRequestSchema>) => {
      console.info('CreateCompany')
      const companyList = JSON.parse(
        localStorage.getItem('company-list') ?? '[]'
      ) as Company[]
      const newId = Number(companyList.at(-1)?.id ?? 0) + 1
      localStorage.setItem(
        'company-list',
        JSON.stringify([
          ...companyList,
          {
            ...payload,
            id: newId.toString(),
          },
        ])
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCompanyList'] })
    },
  })
}

export const useUpdateCompany = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      ...payload
    }: z.infer<typeof companyUpdateRequestSchema>) => {
      console.info('UpdateCompany')
      const companyList = JSON.parse(
        localStorage.getItem('company-list') ?? '[]'
      ) as Company[]
      localStorage.setItem(
        'company-list',
        JSON.stringify(
          companyList.map((company) =>
            company.id === id
              ? {
                  ...company,
                  ...payload,
                }
              : company
          )
        )
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myCompanyList'] })
    },
  })
}
