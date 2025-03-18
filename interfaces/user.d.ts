import { Group } from './group';

export type User = {
  name: string,
  username: string,
  points: number,
  group: Group[] | null
}

export type AuthData = {
  username: string,
  password: string,
}
