type CatalogTab = 'all' | 'new' | 'trending'

interface MarketplaceToolbarProps {
  activeTab: CatalogTab
  onTabChange: (tab: CatalogTab) => void
  sort: string
  onSortChange: (sort: string) => void
}

const tabs: { value: CatalogTab; label: string }[] = [
  { value: 'all', label: 'Todos os NFTs' },
  { value: 'new', label: 'Novos lançamentos' },
  { value: 'trending', label: 'Em alta' },
]

export function MarketplaceToolbar({
  activeTab,
  onTabChange,
  sort,
  onSortChange,
}: MarketplaceToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div
        className="flex flex-wrap items-center gap-5"
        role="group"
        aria-label="Exibição do catálogo"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            aria-pressed={activeTab === tab.value}
            onClick={() => onTabChange(tab.value)}
            className={`border-b-2 pb-1 text-sm
              focus-visible:outline-2 focus-visible:outline-offset-4
              focus-visible:outline-[#d28c46]
              ${
                activeTab === tab.value
                  ? 'border-[#d28c46] font-bold text-[#d28c46]'
                  : 'border-transparent text-[#f5f3ed] hover:text-[#d28c46]'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <label htmlFor="catalog-sort" className="shrink-0">
          Ordenar por:
        </label>

        <select
          id="catalog-sort"
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
          className="min-w-0 rounded bg-[#140e0a] py-1
                     text-[#f5f3ed] outline-none
                     focus-visible:ring-2 focus-visible:ring-[#d28c46]"
        >
          <option value="recent">Listados recentemente</option>
          <option value="price-asc">Menor preço</option>
          <option value="price-desc">Maior preço</option>
        </select>
      </div>
    </div>
  )
}