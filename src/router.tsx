import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router'
import App from './App'
import type { CatalogSearch } from './features/marketplace/nfts'

const rootRoute = createRootRoute({
  component: Outlet,
  notFoundComponent: () => <p>Página não encontrada.</p>,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search: Record<string, unknown>): CatalogSearch => {
    const page = Number(search.page ?? 1)

    return {
    q: typeof search.q === 'string' ? search.q : '',
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
    category: typeof search.category === 'string' ? search.category : '',
    }
  },
  component: App,
})

const routeTree = rootRoute.addChildren([indexRoute])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}