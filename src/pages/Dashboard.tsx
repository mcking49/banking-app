import { Popover, Transition } from '@headlessui/react'
import {
  ArrowLeftOnRectangleIcon,
  BanknotesIcon as BanknotesIconOutline,
  DocumentTextIcon as DocumentTextIconOutline,
} from '@heroicons/react/24/outline'
import {
  Bars3Icon,
  BanknotesIcon as BanknotesIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
} from '@heroicons/react/24/solid'
import { clsx } from 'clsx'
import { FC, Fragment, useRef } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { useLogoutMutation, useMeQuery } from '../app/api'
import { useAppSelector } from '../app/hooks'
import { selectPage } from '../app/slices/pageSlice'

const Dashboard: FC = () => {
  const [logout] = useLogoutMutation()
  const currentPage = useAppSelector(selectPage)
  const headerNavRef = useRef<HTMLElement>(null)
  const navigate = useNavigate()

  const { data: user } = useMeQuery(null)

  const onClickLogout = async () => {
    await logout(null)
  }

  return (
    <div
      className="relative flex h-full w-full flex-col overflow-auto"
      style={{ paddingTop: headerNavRef.current?.offsetHeight ?? 0 }}
    >
      {/* Header nav */}
      <nav
        ref={headerNavRef}
        className="absolute top-0 left-0 flex w-full items-center justify-between bg-white p-4 shadow-sm"
      >
        <h1 className="text-center text-lg font-bold uppercase tracking-widest text-primary-blue-900">
          {currentPage}
        </h1>
        <Popover>
          {({ close }) => (
            <>
              <Popover.Button className="rounded border border-primary-blue-900 p-1 outline-none">
                <Bars3Icon className="h-6 w-6 text-primary-blue-900" />
              </Popover.Button>

              <Transition>
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <Transition.Child
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-x-1/2"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 translate-x-1/2"
                >
                  <Popover.Panel className="absolute right-0 top-0 h-screen w-4/5 shadow-lg">
                    {/* Menu inside a div as im likely to extract it out as a component soon */}
                    <div className="flex h-full w-full flex-col items-center bg-white p-8">
                      {/* avatar */}
                      {user && (
                        // Profile container
                        <div className="flex flex-col items-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-green-500 text-2xl text-primary-green-100">
                            {user.username.charAt(0).toUpperCase()}
                          </div>

                          <p className="mt-4 tracking-wide text-grey-900">
                            Welcome, {user.username}
                          </p>
                        </div>
                      )}

                      {/* Spacer */}
                      <hr className="m-10 w-1/2 border-t border-black" />

                      {/* Page links */}
                      <ul className="flex w-full flex-col gap-4">
                        <li>
                          <NavLink
                            to="/dashboard/accounts"
                            onClick={() => close()}
                            className={({ isActive }) =>
                              clsx(
                                'relative inline-flex w-full items-center rounded-lg py-2 px-4 pl-12 text-grey-800 transition-all',
                                !isActive && 'hover:bg-primary-blue-40 hover:text-primary-blue-900',
                                isActive && 'bg-primary-blue-100 text-primary-blue-800'
                              )
                            }
                          >
                            {({ isActive }) => (
                              <>
                                <BanknotesIconOutline
                                  className={clsx(
                                    'absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all',
                                    isActive ? 'opacity-0' : 'opacity-100'
                                  )}
                                />
                                <BanknotesIconSolid
                                  className={clsx(
                                    'absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all',
                                    isActive ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                <span>Accounts</span>
                              </>
                            )}
                          </NavLink>
                        </li>
                        <li className="w-full">
                          <NavLink
                            to="/dashboard/transactions"
                            onClick={() => close()}
                            className={({ isActive }) =>
                              clsx(
                                'relative inline-flex w-full items-center rounded-lg py-2 px-4 pl-12 text-grey-800 transition-all',
                                !isActive && 'hover:bg-primary-blue-40 hover:text-primary-blue-900',
                                isActive && 'bg-primary-blue-100 text-primary-blue-800'
                              )
                            }
                          >
                            {({ isActive }) => (
                              <>
                                <DocumentTextIconOutline
                                  className={clsx(
                                    'absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all',
                                    isActive ? 'opacity-0' : 'opacity-100'
                                  )}
                                />
                                <DocumentTextIconSolid
                                  className={clsx(
                                    'absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 transition-all',
                                    isActive ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                <span>Transactions</span>
                              </>
                            )}
                          </NavLink>
                        </li>
                      </ul>

                      {/* footer items */}
                      <div className="mt-auto w-full">
                        <button
                          onClick={async () => {
                            await onClickLogout()
                            close()
                            navigate('/')
                          }}
                          className="relative flex w-full items-center rounded-lg py-2 px-4 text-secondary-red-500 transition-all hover:bg-secondary-red-100 hover:text-secondary-red-900"
                        >
                          <ArrowLeftOnRectangleIcon className="mr-4 h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition.Child>
              </Transition>
            </>
          )}
        </Popover>
      </nav>

      {/* content */}
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard
