import { clsx } from 'clsx'

import { numberAsCurrency } from '../../utils/numberAsCurrency'
import { useTransactionsQuery } from '../../app/api'

type Props = {
  accountId: string
}

export const TransactionsCard = ({ accountId }: Props) => {
  const { data: transactions } = useTransactionsQuery({ accountId: accountId! })

  return (
    <div className="mt-8 flex w-full flex-col items-center rounded-md bg-white p-8 drop-shadow-md">
      <h2 className="mb-6 font-bold uppercase tracking-widest text-primary-blue-700">
        Recent Transactions
      </h2>

      {transactions
        ? transactions.map((transaction) => (
            <div
              key={transaction.uuid}
              className="flex w-full items-center justify-between border-t border-t-grey-100 py-4"
            >
              <p className="text-sm">{transaction.payee}</p>
              <p
                className={clsx(
                  'font-semibold',
                  transaction.amount > 0 ? 'text-primary-green-500' : 'text-secondary-red-500'
                )}
              >
                {transaction.amount > 0 && <span>+</span>}
                {numberAsCurrency(transaction.amount)}
              </p>
            </div>
          ))
        : Array.from(Array(3)).map((_, i) => (
            <div
              key={`skeleton_${i}`}
              className="flex w-full items-center justify-between border-t border-t-grey-100 py-4"
            >
              <div className="h-3 w-full animate-pulse bg-grey-200" />
            </div>
          ))}
    </div>
  )
}
