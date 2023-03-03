import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useLazyMeQuery, useLoginMutation } from '../app/api'

import { Field } from '@components/form'
import {
  IconLock,
  IconSpinCircle,
  IconUser,
  IconViewHidden,
  IconViewVisible,
} from '@components/icons'
import { LoginSchema, type LoginForm } from '@types'
import { Button } from '@components/buttons'

const Login: FC = () => {
  const [loginMutation, { error }] = useLoginMutation()
  const [fetchMe] = useLazyMeQuery()
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
      await fetchMe(null)
      toast.success(`Welcome back, ${response.username}`)
      navigate('/dashboard/accounts', { replace: true })
    } catch (e) {}
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

            <Field
              {...register('username')}
              placeholder="Username"
              isDisabled={isSubmitting}
              errorMessage={errors?.username?.message}
              leftIcon={<IconUser />}
            />

            <Field
              {...register('password')}
              type={isPwVisible ? 'text' : 'password'}
              placeholder="Password"
              isDisabled={isSubmitting}
              errorMessage={errors?.password?.message}
              leftIcon={<IconLock />}
              rightIcon={
                // Should probably refactor this into an IconButton component
                <button
                  className="relative h-full w-full text-grey-500 transition-all hover:text-grey-900 focus-visible:outline-none"
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
              }
            />
          </div>

          <div className="mt-8 flex w-full justify-center">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <IconSpinCircle className="mr-2 h-4 w-4" />}
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
