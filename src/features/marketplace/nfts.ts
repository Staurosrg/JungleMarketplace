import { api } from '../../services/api'

export interface NFT {
  id: string
  name: string
  collection: string
  price: string
  image: string
  category: string
}

export interface CatalogSearch {
  q: string
  page: number
}

export interface NFTPage {
  items: NFT[]
  total: number
  page: number
  totalPages: number
}

export interface CatalogSearch {
  q: string
  page: number
  category: string
}

export interface NFTPage {
  items: NFT[]
  total: number
  page: number
  totalPages: number
  collections: {
    name: string
    count: number
  }[]
}

export async function getNFTs(
  params: CatalogSearch,
  signal?: AbortSignal,
): Promise<NFTPage> {
  const { data } = await api.get<NFTPage>('/nfts', {
    params,
    signal,
  })

  return data
}