export type Group = {
  name: string,
  uuid: string,
  leader: string,
  description?: string,
  members: User[] | null
}
