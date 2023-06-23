export type Root = Root2[]

export interface Root2 {
  id: number
  title: string
  price: number
  description: string
  category: string
  images: string
  rating: Rating
}


export interface Rating {
  rate: number
  count: number
}