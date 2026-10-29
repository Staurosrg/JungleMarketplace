interface CollectionOption {
  name: string
  count: number
}

interface MarketplaceSidebarProps {
  collections: CollectionOption[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function MarketplaceSidebar({
  collections,
  selectedCategory,
  onCategoryChange,
}: MarketplaceSidebarProps) {
  return (
    <aside
      aria-labelledby="collections-title"
      className="flex min-w-0 flex-col gap-6"
    >
      <div className="bg-[#241813] p-5">
        <h2 id="collections-title" className="text-base font-bold">
          Coleções
        </h2>

        <ul className="mt-4 flex flex-col gap-1">
          {collections.map(({ name, count }) => {
            const isSelected = selectedCategory === name

            return (
              <li key={name}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onCategoryChange(isSelected ? '' : name)}
                  className={`flex w-full items-center justify-between
                    gap-4 rounded px-3 py-2 text-left text-sm
                    focus-visible:outline-2 focus-visible:outline-offset-2
                    focus-visible:outline-[#d28c46]
                    ${
                      isSelected
                        ? 'bg-[#352218] font-bold text-[#d28c46]'
                        : 'text-[#d6b888] hover:bg-[#352218]'
                    }`}
                >
                  <span>
                    {isSelected && <span aria-hidden="true">✓ </span>}
                    {name}
                  </span>

                  <span>({count})</span>
                </button>
              </li>
            )
          })}
        </ul>

        {selectedCategory && (
          <button
            type="button"
            onClick={() => onCategoryChange('')}
            className="mt-4 rounded text-sm text-[#d28c46] underline
                       focus-visible:outline-2 focus-visible:outline-offset-4
                       focus-visible:outline-[#d28c46]"
          >
            Limpar seleção
          </button>
        )}
      </div>
    </aside>
  )
}