import { Bars3Icon } from '@heroicons/react/24/solid'
import { FC, Fragment, useEffect, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'

import { Outlet } from 'react-router-dom'
import { useLogoutMutation, useMeQuery } from '../app/api'
import { useAppSelector } from '../app/hooks'
import { selectPage } from '../app/slices/pageSlice'

const Dashboard: FC = () => {
  const [logout] = useLogoutMutation()
  const currentPage = useAppSelector(selectPage)
  const headerNavRef = useRef<HTMLElement>(null)

  const { data: user } = useMeQuery(null)

  const onClickLogout = () => {
    logout(null)
  }

  useEffect(() => {
    ;(window as any).logout = () => logout(null)
  }, [])

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
                <div className="flex h-full w-full flex-col items-center bg-primary-blue-700 p-8">
                  {/* avatar */}
                  {user && (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-green-100 text-2xl text-primary-green-500">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </Popover.Panel>
            </Transition.Child>
          </Transition>
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
