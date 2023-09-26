import './globals.css'
import type { Metadata } from 'next'
import Navigation from './components/Navigation'
import { store } from './stores/store'
import { ReduxProvider } from './reduxProvider'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body>
          <div className="bg-white">
            <slot name="header" >
                <Navigation />
            </slot>
            {/* <slot name="footer" >
                <LayoutsNotification />
                <LayoutsDefaultFooter />
            </slot> */}
          </div>
          {children}
        </body>
      </html>
    </ReduxProvider>
  )
}
