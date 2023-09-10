import { ICard } from '../../Card/types'

interface ICardElement extends ICard {
  id: number
}

export interface ICardList {
  title: string
  cards: ICardElement[]
}
