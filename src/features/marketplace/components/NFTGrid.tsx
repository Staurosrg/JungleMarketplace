import type { NFT } from '../nfts'
import { NFTCard } from './NFTCard'

interface NFTGridProps {
  nfts: NFT[]
  isPending: boolean
  isError: boolean
  onRetry: () => void
}

const gridClassName =
  'grid grid-cols-1 gap-x-[34px] gap-y-[72px] ' +
  'min-[540px]:grid-cols-2 lg:grid-cols-3'

export function NFTGrid({
  nfts,
  isPending,
  isError,
  onRetry,
}: NFTGridProps) {
  if (isPending) {
    return (
      <div role="status" aria-label="Carregando NFTs">
        <span className="sr-only">Carregando NFTs...</span>

        <div className={gridClassName} aria-hidden="true">
          {Array.from({ length: 9 }, (_, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="nft-skeleton aspect-square rounded-2xl" />
              <div className="nft-skeleton h-[18px] w-3/4 rounded" />
              <div className="nft-skeleton h-5 w-1/3 rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-[#49301e] p-6">
        <p role="alert">Não foi possível carregar o catálogo.</p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded bg-[#d28c46] px-4 py-2
                     font-bold text-[#140e0a]
                     focus-visible:outline-2
                     focus-visible:outline-offset-4
                     focus-visible:outline-[#d28c46]"
        >
          Tentar novamente
        </button>
      </div>
    )
  }

  if (nfts.length === 0) {
    return <p role="status">Nenhum NFT encontrado para essa busca.</p>
  }

  return (
    <div className={gridClassName}>
      {nfts.map((nft) => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  )
}