import './globals.css'

export const metadata = {
  title: 'Coca-Cola Pulse',
  description: 'Feel the Pulse of Connection',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 