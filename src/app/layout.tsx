import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import Sidebar from '../../components/sidebar'
import SupabaseProvider from '../../providers/SupabaseProvider'
import UserProvider from '../../providers/UserProvider'
import ModalProvider from '../../providers/ModalProvider'
import ToasterProvider from '../../providers/ToasterProvider'
import getSongsUserID from '../../actions/getSongsUserID'
import Player from '../../components/player'
import getActiveProductsWithPrices from '../../actions/getActiveProductsWithPrices'

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
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">

      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
            <Sidebar songs={userSongs}>
              {children}
            </Sidebar>
            <Player />
            {/* {children} */}
          </UserProvider>
        </SupabaseProvider>
      </body>

    </html>
  )
}
