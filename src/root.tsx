import { ThemeProvider, createTheme } from '@mui/material'
import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import i18n from 'i18n'
import { DrawerProvider } from 'providers'
import { I18nextProvider } from 'react-i18next'
import globalStyles from 'styles/global.scss?url'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStyles },
]

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 24h
    },
  },
})

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  const theme = createTheme()

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <DrawerProvider>
            <Outlet />
          </DrawerProvider>
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  )
}
