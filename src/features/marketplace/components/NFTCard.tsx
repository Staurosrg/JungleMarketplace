import type { NFT } from '../nfts'

interface NFTCardProps {
  nft: NFT
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <article className="flex min-w-0 flex-col gap-3">
      <div className="aspect-square bg-[#241813]">
        <img
          src={nft.image}
          alt={nft.name}
          loading="lazy"
          width={258}
          height={258}
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>

      <h3 className="text-sm leading-[18px]">
        {nft.name}
      </h3>

      <p className="text-base font-bold leading-5 text-[#d28c46]">
        {nft.price} ETH
      </p>
    </article>
  )
}