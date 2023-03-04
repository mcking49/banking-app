type Props = {
  username: string | null | undefined
}

export const Avatar = ({ username }: Props) => {
  return username ? (
    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-green-500 text-2xl text-primary-green-100">
      {username.charAt(0).toUpperCase()}
    </div>
  ) : (
    <div className="h-16 w-16 animate-pulse rounded-full bg-grey-200" />
  )
}
