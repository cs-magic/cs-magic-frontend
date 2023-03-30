import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { RootLayout } from '@/comps/layouts/RootLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <RootLayout>
      hello
    </RootLayout>
  )
}
