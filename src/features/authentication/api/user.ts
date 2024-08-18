import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  User,
  changePasswordRequestSchema,
  loginRequestSchema,
} from 'features/authentication/types'
import type { z } from 'zod'

export const useMe = () => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      if (!localStorage.getItem('access-token')) {
        throw new Error('Unauthorized')
      }
      return {
        email: 'user-a@example.com',
        username: 'ユーザーA',
        isPasswordChanged: localStorage.getItem('password-changed') === 'true',
      } satisfies User
    },
  })
}

export const useUpdateMyPassword = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      password,
    }: z.infer<typeof changePasswordRequestSchema>) => {
      console.info('UpdateMyPassword')
      localStorage.setItem('password-changed', 'true')
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['me'] }),
        queryClient.invalidateQueries({ queryKey: ['myCompanyList'] }),
      ])
    },
  })
}

export const usePostToken = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: z.infer<typeof loginRequestSchema>) => {
      console.info('PostToken')
      localStorage.setItem('access-token', 'true')
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['me'] }),
        queryClient.invalidateQueries({ queryKey: ['myCompanyList'] }),
      ])
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      queryClient.removeQueries()
      window.localStorage.removeItem('access-token')
      await Promise.resolve()
    },
  })
}
