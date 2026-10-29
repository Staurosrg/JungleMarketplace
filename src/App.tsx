import type { JSX } from 'react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { Header } from './components/layout/Header'
import { getNFTs } from './features/marketplace/nfts'
import { NFTGrid } from './features/marketplace/components/NFTGrid'
import { MarketplaceToolbar } from './features/marketplace/components/MarketplaceToolbar'
import { MarketplacePagination } from './features/marketplace/components/MarketplacePagination'
import { MarketplaceSidebar } from './features/marketplace/components/MarketplaceSidebar'
import heroImage from './assets/hero.png'

const routeApi = getRouteApi('/')

export default function App(): JSX.Element {
  const search = routeApi.useSearch()
  const navigate = routeApi.useNavigate()

  const [activeTab, setActiveTab] =
    useState<'all' | 'new' | 'trending'>('all')
  const [sort, setSort] = useState('recent')

  const {
    data,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ['nfts', search],
    queryFn: ({ signal }) => getNFTs(search, signal),
  })

  function changeSearch(value: string) {
  void navigate({
    search: { ...search, q: value, page: 1 },
    replace: true,
    resetScroll: false,
  })
}

function changeCategory(category: string) {
  void navigate({
    search: { ...search, category, page: 1 },
    resetScroll: false,
  })
}

  function changePage(page: number) {
    void navigate({
      search: { ...search, page },
      resetScroll: false,
    })
  }

  return (
    <>
      <Header />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__content">
            <p className="hero__welcome">Bem-vindo à Kurio</p>

            <h1 id="hero-title" className="hero__title">
              SEJA DONO DO FUTURO
              <br />
              DA ARTE DIGITAL
            </h1>

            <p className="hero__description">
              Descubra NFTs selecionados de criadores emergentes e consagrados.
              Colecione arte digital rara, apoie artistas e tenha uma parte da
              cultura da internet.
            </p>

            <a className="hero__button" href="#mercado">
              EXPLORAR
            </a>

            <div
              className="hero__dots"
              role="img"
              aria-label="Indicador visual com três pontos"
            >
              <span className="hero__dot" />
              <span className="hero__dot" />
              <span className="hero__dot" />
            </div>
          </div>

          <img
            className="hero__image"
            src={heroImage}
            alt="Ilustração de um macaco com óculos escuros e jaqueta verde"
          />
        </section>

        <section
          id="mercado"
          aria-label="Marketplace de NFTs"
          className="mx-auto grid w-[calc(100%-48px)] max-w-[1200px]
                     grid-cols-1 items-start gap-12 pb-20
                     lg:grid-cols-[310px_minmax(0,1fr)]"
        >
          <MarketplaceSidebar
			collections={data?.collections ?? []}
			selectedCategory={search.category}
			onCategoryChange={changeCategory}
			/>

          <div className="flex min-w-0 flex-col gap-[88px]">
            <div className="flex min-w-0 flex-col gap-8">
              <div>
                <MarketplaceToolbar
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  sort={sort}
                  onSortChange={setSort}
                />

                <label
                  htmlFor="nft-search"
                  className="mb-2 mt-5 block text-sm"
                >
                  Buscar NFTs
                </label>

                <input
                  id="nft-search"
                  type="search"
                  placeholder="Nome, coleção ou categoria..."
                  value={search.q}
                  onChange={(event) => changeSearch(event.target.value)}
                  className="w-full rounded-lg border border-[#49301e]
                             bg-[#241813] px-4 py-3 text-sm
                             outline-none focus-visible:border-[#d28c46]
                             focus-visible:ring-1 focus-visible:ring-[#d28c46]"
                />
              </div>

              <NFTGrid
                nfts={data?.items ?? []}
                isPending={isPending}
                isError={isError}
                onRetry={() => {
                  void refetch()
                }}
              />
            </div>

            {data && !isError && (
              <div>
                <p role="status" className="sr-only">
                  Página {data.page} de {data.totalPages}.
                  {' '}{data.total} NFTs encontrados.
                </p>

                <MarketplacePagination
                  page={data.page}
                  totalPages={data.totalPages}
                  onPageChange={changePage}
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  )
}