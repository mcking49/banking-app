import { z } from 'zod'

export type ObjectValues<T> = T[keyof T]

export type User = {
  uuid: string
  username: string
}

export const LoginSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
  })
  .required()

export type LoginForm = z.infer<typeof LoginSchema>
