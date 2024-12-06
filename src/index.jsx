import ReactDOM from 'react-dom/client'
import { RootCmp } from './RootCmp.jsx'
import { HashRouter as Router } from 'react-router-dom'

import './assets/styles/main.scss'
import { StrictMode } from 'react'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

const theme = createTheme({
  direction: 'rtl',
})

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <StrictMode>
        <Router>
          <RootCmp />
        </Router>
      </StrictMode>
    </ThemeProvider>
  </CacheProvider>
)
