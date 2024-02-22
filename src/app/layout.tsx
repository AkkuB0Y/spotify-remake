import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '../../components/sidebar'
import SupabaseProvider from '../../providers/SupabaseProvider'
import UserProvider from '../../providers/UserProvider'
import ModalProvider from '../../providers/ModalProvider'
import ToasterProvider from '../../providers/ToasterProvider'
import getSongsUserID from '../../actions/getSongsUserID'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone'
}

export const revalidate = 0; // prevents caching (no need to store info everytime you reload)!

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSongs = await getSongsUserID();

  return (
    <html lang="en">

      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            {/* {children} */}
          </UserProvider>
        </SupabaseProvider>
      </body>

    </html>
  )
}
