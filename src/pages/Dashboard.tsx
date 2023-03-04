import { Popover, Transition } from '@headlessui/react'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { ArrowLeftIcon, Bars3Icon } from '@heroicons/react/24/solid'
import { clsx } from 'clsx'
import { FC, Fragment } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useLogoutMutation, useMeQuery } from '../app/api'
import { useAppSelector } from '../app/hooks'
import { selectPageTitle } from '../app/slices/pageTitleSlice'

import { Avatar } from '@components/Avatar'
import { NavMenu } from '@components/nav'

const Dashboard: FC = () => {
  const [logout] = useLogoutMutation()
  const currentPage = useAppSelector(selectPageTitle)
  const navigate = useNavigate()
  const location = useLocation()

  const { data: user } = useMeQuery(null)

  const onClickLogout = async () => {
    await logout(null)
  }

  return (
    <div className="relative flex h-full w-full flex-col overflow-auto pt-16 lg:pt-24">
      {/* Header nav */}
      <nav className="absolute top-0 left-0 flex w-full items-center justify-between bg-white p-4 shadow-sm lg:justify-start lg:gap-8 lg:pl-20">
        {location.pathname !== '/dashboard/accounts' && (
          <button
            onClick={() => navigate(-1)}
            className="border border-transparent p-1 lg:absolute lg:left-6"
          >
            <ArrowLeftIcon className="h-6 w-6 text-primary-blue-900" />
          </button>
        )}

        <div className="hidden lg:block">
          <Avatar username={user?.username} />
        </div>

        <h1
          className={clsx(
            'text-center text-lg font-bold uppercase tracking-widest text-primary-blue-900',
            !currentPage && 'h-5 w-1/2 animate-pulse bg-grey-200 lg:w-56'
          )}
        >
          <Transition
            as={Fragment}
            show={!!currentPage}
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
          >
            <span>{currentPage}</span>
          </Transition>
        </h1>

        <NavMenu className="hidden lg:flex" />

        <div className="ml-auto hidden lg:block">
          <button
            onClick={async () => {
              await onClickLogout()
              close()
              navigate('/')
            }}
            className="relative flex items-center rounded-lg py-2 px-4 text-secondary-red-500 transition-all hover:bg-secondary-red-100 hover:text-secondary-red-900"
          >
            <ArrowLeftOnRectangleIcon className="mr-4 h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>

        <Popover className="z-50 lg:hidden">
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
                  <Popover.Panel className="fixed right-0 top-0 h-full w-4/5 max-w-xs shadow-lg">
                    {/* Menu inside a div as im likely to extract it out as a component soon */}
                    <div className="flex h-full w-full flex-col items-center bg-white p-8">
                      {/* avatar */}
                      <div className="flex flex-col items-center">
                        <Avatar username={user?.username} />

                        {user && (
                          <p className="mt-4 tracking-wide text-grey-900">
                            Welcome, {user.username}
                          </p>
                        )}
                      </div>

                      {/* Spacer */}
                      <hr className="m-10 w-1/2 border-t border-black" />

                      {/* Page links */}
                      <NavMenu />

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
