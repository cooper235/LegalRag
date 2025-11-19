import './globals.css'

export const metadata = {
  title: 'Legal AI Judge ⚖️',
  description: 'AI-powered legal verdict prediction and judgment generation',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
