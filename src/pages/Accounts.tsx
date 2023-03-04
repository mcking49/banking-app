import { Fragment, useEffect, useState, type FC } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { clsx } from 'clsx'
import { toast } from 'react-hot-toast'

import { useAccountsQuery, useCreateAccountMutation, useMeQuery } from '../app/api'
import { useAppDispatch } from '../app/hooks'
import { setPageTitle } from '../app/slices/pageTitleSlice'
import { capitalise } from '../utils/stringHelpers'

import { AccountSummaryCard } from '@components/cards'
import { AccountCardSkeleton } from '@components/loading'
import { Button } from '@components/buttons'
import { AccountForm, AccountSchema, AccountType, AccountTypes } from '@types'
import { Field } from '@components/form'
import { IconSpinCircle } from '@components/icons'

const Accounts: FC = () => {
  const dispatch = useAppDispatch()
  const { data: user } = useMeQuery(null)
  const { data: accounts } = useAccountsQuery({ userId: user!.uuid }, {})
  const [isNewAccountFormOpen, setIsNewAccountFormOpen] = useState(false)
  const [createAccountMutation] = useCreateAccountMutation()

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    watch,
    setValue,
  } = useForm<AccountForm>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      type: 'everyday',
      name: '',
    },
  })

  const selectedType = watch('type')

  const createAccount = async (data: AccountForm) => {
    try {
      await createAccountMutation(data)
      toast.success('New Account Created!')
      setIsNewAccountFormOpen(false)
    } catch (error) {
      toast.error('Something went wrong, please try again later')
    }
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
              <Listbox
                {...register('type')}
                as="div"
                className="relative z-10"
                onChange={(value: AccountType) => {
                  setValue('type', value)
                }}
              >
                <Listbox.Button className="relative w-full rounded-md border border-grey-100 bg-grey-100 px-6 py-2 pr-12 text-left outline-none transition-all focus:ring">
                  {({ open }) => (
                    <>
                      <span>{capitalise(selectedType)}</span>
                      <ChevronDownIcon
                        className={clsx(
                          'absolute top-1/2 right-3 flex h-5 w-5 -translate-y-1/2 text-grey-500 transition-all',
                          { 'rotate-180': open }
                        )}
                      />
                    </>
                  )}
                </Listbox.Button>

                <Transition
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options className="absolute z-50 w-full translate-y-1 rounded-md border border-grey-100 bg-white py-1 drop-shadow-xl">
                    {AccountTypes.map((type) => (
                      <Listbox.Option
                        key={type}
                        value={type}
                        className="py-2 px-4 hover:cursor-pointer hover:bg-primary-blue-100 hover:text-primary-blue-800"
                      >
                        {capitalise(type)}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </Listbox>

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
