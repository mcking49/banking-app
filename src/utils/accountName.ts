import { Account } from '@types'

export const accountName = (account: Account) => {
  if (account.name) {
    return account.name
  }

  return account.type.charAt(0).toUpperCase() + account.type.slice(1)
}
