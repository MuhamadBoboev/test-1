import { ReactNode } from 'react'
import { ReduxProvider } from '@/config/providers/ReduxProvider'
import { Modals } from '@config/providers/Modals'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@config/providers/AuthProvider'

function Providers({children}: { children: ReactNode }) {
  return (
    <ReduxProvider>
      <AuthProvider>
        {children}
        <Modals/>
        <Toaster/>
      </AuthProvider>
    </ReduxProvider>
  )
}

export { Providers }