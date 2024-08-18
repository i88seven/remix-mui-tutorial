import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)

export type User = {
  email: string
  username: string
  isPasswordChanged: boolean
}

export type Token = {
  refresh: string
  access: string
}

export const loginFormSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(8),
})
export const loginRequestSchema = loginFormSchema

export const changePasswordFormSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: passwordSchema,
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        path: ['passwordConfirm'],
        code: 'custom',
        message: 'パスワードが一致しません',
      })
    }
  })
export const changePasswordRequestSchema = z.object({
  password: passwordSchema,
})
