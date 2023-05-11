import '@/styles/globals.css'
import { CssBaseline, FormControlLabel, GlobalStyles, PaletteMode, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { themeDesign } from '@/utils/theme'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { createTheme, styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import DarkModeButton from '@/components/Button/DarkModeButton'
import { useMemo, useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<PaletteMode>('light')
  // const [darkMode, setDarkMode] = useState(false);

  const handleThemeChange = useMemo(() => {
    return () => {
      setMode((prevMode: PaletteMode) => prevMode === 'light' ? 'dark' : 'light');
    };
  }, []);
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(themeDesign(mode)), [mode])
  return (
    <>
      <Head>
        <title>TTN Chat 1.0</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            body: {
              // background: 'linear-gradient(109.6deg, rgb(20, 30, 48) 11.2%, rgb(36, 59, 85) 91.1%)',
            },
          }}
        />
        <SessionProvider session={pageProps.session}>
          <DarkModeButton mode={mode} onThemeChange={handleThemeChange} />
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </>
  )
}
