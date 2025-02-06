import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProviderWrapper } from './ThemeContex.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProviderWrapper>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </ThemeProviderWrapper>
  </StrictMode>,
)
