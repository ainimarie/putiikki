import { getOne } from './db';

// Add some typechecks ( ﾉ ﾟｰﾟ)ﾉ
// type User = {
//   name: string,
//   points: number,
// }

export function getUser(name: string) {
  const userQuery = getOne('SELECT name, points FROM customers WHERE name = ? COLLATE NOCASE', name);

  // if exists return, catch with not found if not
  return userQuery;

}