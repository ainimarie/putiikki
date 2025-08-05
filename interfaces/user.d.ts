import { UserGroup } from './group';

export type User = {
  name: string,
  username: string,
  points: number,
  groups: UserGroup[] | null
}

export type AuthData = {
  username: string,
  password: string,
}
