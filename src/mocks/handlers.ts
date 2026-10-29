import { http, HttpResponse } from 'msw/http'
import { nftFixtures } from './fixtures/nfts'

const PAGE_SIZE = 3

const categoryNames = [
  'Arte digital',
  'Fotografia',
  'Música',
  'Arte 3D',
  'Colecionáveis',
  'Generativa',
  'Jogos',
  'Assinaturas',
  'Utilidade',
]

export const handlers = [
  http.get('/api/nfts', ({ request }) => {
    const url = new URL(request.url)

    const query = (url.searchParams.get('q') ?? '').trim().toLowerCase()
    const category = url.searchParams.get('category') ?? ''
    const requestedPage = Number(url.searchParams.get('page') ?? 1)

    const collections = categoryNames.map((name) => ({
      name,
      count: nftFixtures.filter((nft) => nft.category === name).length,
    }))

    const results = nftFixtures.filter((nft) => {
      const matchesSearch =
        `${nft.name} ${nft.collection} ${nft.category}`
          .toLowerCase()
          .includes(query)

      const matchesCategory = !category || nft.category === category

      return matchesSearch && matchesCategory
    })

    const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE))

    const page =
      Number.isSafeInteger(requestedPage) && requestedPage > 0
        ? Math.min(requestedPage, totalPages)
        : 1

    const start = (page - 1) * PAGE_SIZE

    return HttpResponse.json({
      items: results.slice(start, start + PAGE_SIZE),
      total: results.length,
      page,
      totalPages,
      collections,
    })
  }),
]