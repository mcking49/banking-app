import { capitalise } from './stringHelpers'

import { Account } from '@types'

export const accountName = (account: Account) => {
  if (account.name) {
    return account.name
  }

  return capitalise(account.type)
}
