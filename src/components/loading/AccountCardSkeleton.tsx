import type { FC } from 'react'

export const AccountCardSkeleton: FC = () => (
  <div className="flex w-64 flex-col items-center justify-center gap-2 rounded-md bg-white p-4 drop-shadow-md transition-all">
    <div className="h-5 w-1/2 animate-pulse bg-grey-200 font-light" />
    <div className="h-7 w-2/3 animate-pulse bg-grey-400 text-center font-semibold" />
  </div>
)
