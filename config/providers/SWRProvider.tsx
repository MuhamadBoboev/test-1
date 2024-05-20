'use client'
import { SWRConfig } from 'swr'
import { PropsWithChildren } from 'react'

function SwrProvider({children}: PropsWithChildren) {
  return (
    <SWRConfig value={{revalidateOnFocus: false}}>
      {children}
    </SWRConfig>
  )
}

export { SwrProvider }