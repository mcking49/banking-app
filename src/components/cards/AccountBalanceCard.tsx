import type { FC, PropsWithChildren } from 'react'

import { numberAsCurrency } from '../../utils/numberAsCurrency'

import { Card } from './Card'

type Props = {
  balance: number
}

const CardHeading: FC<PropsWithChildren> = ({ children }) => (
  <p className="text-xs font-semibold uppercase tracking-wide text-grey-300">{children}</p>
)

export const AccountBalanceCard: FC<Props> = ({ balance }) => {
  const balanceAsCurr = numberAsCurrency(balance)
  const [wholeNumOfBal, decimal] = balanceAsCurr.split('.')

  return (
    <Card heading={<CardHeading>Balance</CardHeading>}>
      <p className="text-center text-xl font-semibold">
        <span>{wholeNumOfBal}</span>
        <span className="text-sm font-normal text-grey-500">.{decimal}</span>
      </p>
    </Card>
  )
}
