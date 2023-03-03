import { z } from 'zod'

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

const AccountTypes = ['savings', 'everyday', 'online'] as const

export type AccountType = (typeof AccountTypes)[number]

export const AccountSchema = z.object({
  type: z.enum(AccountTypes),
  name: z
    .string()
    .regex(new RegExp('^[a-zA-Z0-9]*$'), { message: 'Name can only contain numbers and letters' })
    .optional(),
})

export type AccountForm = z.infer<typeof AccountSchema>

export type Account = AccountForm & {
  uuid: string
  userId: string
  balance: number
}

export type Transaction = {
  uuid: string
  createdAt: string // ISOString timestamp
  updatedAt: string // ISOString timestamp
  description: string
  accountId: string
  amount: number
}
