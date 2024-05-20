import { ReactNode } from 'react'
import '@styles/index.scss'
import { Header } from '@widgets/Header'
import { Providers } from '@/config/providers/Providers'
import { Navbar } from '@widgets/Navbar'
import { Footer } from '@widgets/Footer'

export const fetchCache = 'force-no-store'
export const revalidate = 0

function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="ru">
    <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <meta name="msapplication-TileColor" content="#da532c"/>
      <meta name="theme-color" content="#ffffff"/>
    </head>
    <body>
    <div className="app-promebel">
      <Providers>
        <Header/>
        <Navbar/>
        <main className="app-main">
          {children}
        </main>
        <Footer/>
      </Providers>
    </div>
    <div id="modal-root"/>
    </body>
    </html>
  )
}

export default RootLayout