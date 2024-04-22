import { z } from 'zod'

export const upsertTodoSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  doneAt: z.string().optional().nullable(),
})

export const upsertMovementSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  category: z.string(),
  description: z.string(),
  value: z.string().transform((data) => parseFloat(data)),
  date: z.string().optional(),
})

export const deleteTodoSchema = z.object({
  id: z.string(),
})
