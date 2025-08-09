export type Item = {
  name: string,
  price: number,
  description?: string,
  uuid: string
}

export type ItemType = 'reward' | 'task' | 'penalty';

export type ItemWithType = Item & {
  type: ItemType
}
