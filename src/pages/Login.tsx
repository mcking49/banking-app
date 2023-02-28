import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { LoginSchema, type LoginForm } from '@types'
import { useLoginMutation } from '../app/api'

import {
  IconLock,
  IconSpinCircle,
  IconUser,
  IconViewHidden,
  IconViewVisible,
} from '@components/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login: FC = () => {
  const [loginMutation, { error }] = useLoginMutation()
  const [isPwVisible, setIsPwVisible] = useState(false)
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  })

  const login = async (data: LoginForm) => {
    try {
      const response = await loginMutation(data).unwrap()
      toast.success(`Welcome back, ${response.username}`)
      navigate('/dashboard/accounts')
    } catch (e) {
      toast.error('Something went wrong. Please try again later')
    }
  }

  useEffect(() => {
    if (error) {
      const fetchError = error as any // originalStatus is printed to console but isn't in the type...
      if (fetchError.originalStatus === 404) {
        toast.error('Invalid username or password, please try again')
      } else {
        toast.error('Something went wrong. Please try again later')
      }
    }
  }, [error])

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-lg flex-col items-center px-4">
        <h1 className="-mt-24 text-center text-2xl">Welcome to your ANZ Portal</h1>

        <form className="mt-8 h-full w-full" onSubmit={handleSubmit(login)}>
          <div className="flex w-full flex-col gap-8 rounded-lg border-t-8 border-t-primary-blue-700 bg-white px-6 py-10 shadow-lg">
            <h2 className="text-center text-lg font-bold uppercase tracking-widest text-grey-600 ">
              Login
            </h2>

            <div className={clsx('text-field relative w-full', { 'opacity-80': isSubmitting })}>
              <input
                {...register('username')}
                type="text"
                placeholder="Username"
                className={clsx(
                  'w-full rounded-md bg-grey-100 px-6 py-2 pl-12 outline-none transition-all focus:ring',
                  { 'focus:ring-secondary-red-400': errors?.username },
                  'border border-grey-100',
                  { 'border-secondary-red-400': errors?.username }
                )}
                disabled={isSubmitting}
              />
              <IconUser className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-grey-500" />

              <span
                className={clsx(
                  'absolute top-full left-0 mt-1 text-xs text-secondary-red-400 transition-all',
                  {
                    'opacity-0': !errors?.username,
                    'opacity-100': errors?.username,
                  }
                )}
              >
                {errors.username?.message}
              </span>
            </div>

            <div className={clsx('text-field relative w-full', { 'opacity-80': isSubmitting })}>
              <input
                {...register('password')}
                type={isPwVisible ? 'text' : 'password'}
                placeholder="Password"
                className={clsx(
                  'w-full rounded-md bg-grey-100 px-6 py-2 pl-12 outline-none transition-all focus:ring',
                  { 'focus:ring-secondary-red-400': errors?.password },
                  'border border-grey-100',
                  { 'border-secondary-red-400': errors?.password }
                )}
                disabled={isSubmitting}
              />

              <span
                className={clsx(
                  'absolute top-full left-0 mt-1 text-xs text-secondary-red-400 transition-all',
                  {
                    'opacity-0': !errors?.password,
                    'opacity-100': errors?.password,
                  }
                )}
              >
                {errors.password?.message}
              </span>

              <IconLock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-grey-500" />

              <button
                className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-grey-500 transition-all hover:text-grey-900 focus-visible:outline-none"
                type="button"
                onClick={() => setIsPwVisible((val) => !val)}
                disabled={isSubmitting}
              >
                <IconViewHidden
                  className={clsx(
                    'absolute top-1/2 h-full w-full -translate-y-1/2 transition-all',
                    { 'opacity-0': !isPwVisible, 'opacity-100': isPwVisible }
                  )}
                />
                <IconViewVisible
                  className={clsx(
                    'absolute top-1/2 h-full w-full -translate-y-1/2 transition-all',
                    { 'opacity-0': isPwVisible, 'opacity-100': !isPwVisible }
                  )}
                />
              </button>
            </div>
          </div>

          <div className="mt-8 flex w-full justify-center">
            <button
              type="submit"
              className="w-full rounded bg-primary-blue-700 py-2 px-4 text-white transition-all hover:bg-primary-blue-800 disabled:opacity-80"
              disabled={isSubmitting}
            >
              {isSubmitting && <IconSpinCircle className="mr-2 h-4 w-4" />}
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
