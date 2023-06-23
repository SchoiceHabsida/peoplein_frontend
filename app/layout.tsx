import { Inter } from 'next/font/google'
import '../css/globals.css'
import { RootProvider } from '@/common/providers';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={inter.className}
      >
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
