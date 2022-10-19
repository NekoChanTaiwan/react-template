import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/theme'
import { App } from './App'
import './styles/index.css'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider enableColorScheme={false} attribute='data-theme'>
      <App />
    </ThemeProvider>
  </StrictMode>
)
