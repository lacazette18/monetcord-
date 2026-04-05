import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MonetCord',
  description: ' Discord Monetization Bot',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}