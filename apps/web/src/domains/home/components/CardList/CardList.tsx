import { FC } from 'react'
import { Card } from '../Card'
import { ICardList } from './types'

export const CardList: FC<ICardList> = ({ title, cards }) => (
  <div className="flex flex-col gap-4">
    <h1 className="font-bold text-2xl">{title}</h1>
    <div className="flex overflow-x-auto no-scrollbar gap-4">
      {cards.map(({ id, ...props }) => (
        <Card key={id} {...props} />
      ))}
    </div>
  </div>
)
