import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query-client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './router'

async function bootstrap() {
  if (import.meta.env.VITE_ENABLE_MOCKS === 'true') {
    const { worker } = await import('./mocks/browser')

    await worker.start()
  }

  const rootElement = document.getElementById('root')

  if (!rootElement) {
    throw new Error('Elemento #root não encontrado.')
  }

  createRoot(rootElement).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
       <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>,
  )
}

bootstrap().catch((error: unknown) => {
  console.error('Não foi possível iniciar a aplicação:', error)

  const rootElement = document.getElementById('root')

  if (rootElement) {
    rootElement.textContent =
      'Não foi possível iniciar a aplicação. Recarregue a página.'
  }
})