import { Fragment, useEffect, useState, type FC } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useAccountsQuery, useMeQuery } from '../app/api'
import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../app/slices/pageTitleSlice'

import { AccountSummaryCard } from '@components/cards'
import { AccountCardSkeleton } from '@components/loading'
import { Button } from '@components/buttons'
import { AccountForm, AccountSchema } from '@types'
import { Field } from '@components/form'
import { IconSpinCircle } from '@components/icons'

const Accounts: FC = () => {
  const dispatch = useAppDispatch()
  const { data: user } = useMeQuery(null)
  const { data: accounts } = useAccountsQuery({ userId: user!.uuid }, {})
  const [isNewAccountFormOpen, setIsNewAccountFormOpen] = useState(false)

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<AccountForm>({
    resolver: zodResolver(AccountSchema),
  })

  const createAccount = (data: AccountForm) => {
    console.log('--- submitting new account', data)
  }

  useEffect(() => {
    dispatch(setPageTitle('Accounts'))
  }, [])

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {accounts ? (
        accounts.map((account, index) => (
          <div
            key={account.uuid}
            className="staggered-item"
            style={{ ['--animation-order' as string]: index.toString() }}
          >
            <AccountSummaryCard account={account} />
          </div>
        ))
      ) : (
        <AccountCardSkeleton />
      )}

      <Button disabled={!accounts} onClick={() => setIsNewAccountFormOpen(true)}>
        Create Account
      </Button>

      <Transition
        show={isNewAccountFormOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
        as={Fragment}
        appear
      >
        <Dialog
          onClose={() => setIsNewAccountFormOpen(false)}
          className="fixed inset-0 z-10 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <Dialog.Panel className="w-80 rounded-md border-t-8 border-t-primary-blue-700 bg-white p-8 drop-shadow-md">
            <Dialog.Title className="text-center text-xl font-bold tracking-wide">
              Create Account
            </Dialog.Title>

            <form
              className="mt-8 flex h-full w-full flex-col gap-8 bg-white"
              onSubmit={handleSubmit(createAccount)}
            >
              {/* TODO: change this to @HeadlessUI/ListBox */}
              <Field
                {...register('type')}
                placeholder="Select an account type"
                isDisabled={isSubmitting}
                errorMessage={errors?.type?.message}
              />

              <Field
                {...register('name')}
                placeholder="Enter a custom name"
                isDisabled={isSubmitting}
                errorMessage={errors?.name?.message}
              />

              <div className="mt-8 flex w-full justify-center">
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting && <IconSpinCircle className="mr-2 h-4 w-4" />}
                  Submit
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </Dialog>
      </Transition>
    </div>
  )
}

export default Accounts
