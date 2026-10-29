interface MarketplacePaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function MarketplacePagination({
  page,
  totalPages,
  onPageChange,
}: MarketplacePaginationProps) {
  if (totalPages <= 1) return null

  const buttonClassName =
    'flex h-8 min-w-8 items-center justify-center rounded ' +
    'border border-[#49301e] px-2 text-sm ' +
    'focus-visible:outline-2 focus-visible:outline-offset-4 ' +
    'focus-visible:outline-[#d28c46]'

  return (
    <nav aria-label="Paginação do catálogo">
      <ul className="flex flex-wrap justify-end gap-2">
        {Array.from({ length: totalPages }, (_, index) => {
          const number = index + 1
          const isActive = page === number

          return (
            <li key={number}>
              <button
                type="button"
                aria-label={`Página ${number}`}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onPageChange(number)}
                className={`${buttonClassName} ${
                  isActive
                    ? 'bg-[#d28c46] font-bold text-[#140e0a]'
                    : 'bg-transparent text-[#d6b888] hover:border-[#d28c46]'
                }`}
              >
                {number}
              </button>
            </li>
          )
        })}

        <li>
          <button
            type="button"
            aria-label="Próxima página"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className={`${buttonClassName}
                        text-[#d6b888] hover:border-[#d28c46]
                        disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  )
}