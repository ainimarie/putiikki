import { User } from "./user"

export type UserGroup = {
  name: string,
  uuid: string,
  isLeader: boolean,
  // description?: string,
  // members: User[] | null
}


export type Group = {
  name: string,
  uuid: string,
  // leader: string,
  description?: string,
  members: Omit<User, "groups">[] | null
}
