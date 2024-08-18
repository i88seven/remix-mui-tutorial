import { z } from 'zod'

export const companyTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export const prefectureSchema = z.object({
  id: z.string(),
  name: z.string(),
  nameKana: z.string(),
})

export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  companyTypeId: z.string(),
  prefectureId: z.string(),
})

const companyFormSchemaBase = z.object({
  name: z.string().min(1),
  companyTypeId: z.string().min(1),
  prefectureId: z.string().min(1),
})
export const companyCreateFormSchema = companyFormSchemaBase
export const companyUpdateFormSchema = companyFormSchemaBase
export const companyCreateRequestSchema = companyCreateFormSchema
export const companyUpdateRequestSchema = companyUpdateFormSchema.extend({
  id: z.string().min(1),
})
