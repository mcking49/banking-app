import type { FC } from 'react'

import { accountName } from '../../utils/accountName'
import { numberAsCurrency } from '../../utils/numberAsCurrency'

import { Card } from './Card'

import { Account } from '@types'

type Props = {
  account: Account
}

export const AccountSummaryCard: FC<Props> = ({ account }) => {
  const balance = numberAsCurrency(account.balance)
  const [wholeNumOfBal, decimal] = balance.split('.')

  return (
    <Card
      to={account.uuid}
      heading={accountName(account)}
      isDisabled={account.status === 'pending'}
      isDisabledText={account.status === 'pending' ? account.status : null}
    >
      <p className="text-center text-xl font-semibold">
        <span>{wholeNumOfBal}</span>
        <span className="text-sm font-normal text-grey-500">.{decimal}</span>
      </p>
    </Card>
  )
}
