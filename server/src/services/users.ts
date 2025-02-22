import { getOne, update } from './db';

// Add some typechecks ( ﾉ ﾟｰﾟ)ﾉ
type User = {
  name: string,
  points: number,
}

export function fetchUser(name: string) {
  const userQuery = getOne('SELECT * FROM customers WHERE name = ? COLLATE NOCASE', name);

  return userQuery;

}

export function getUser(name: string) {
  const userQuery = getOne('SELECT name, points FROM customers WHERE name = ? COLLATE NOCASE', name);

  if (userQuery)
    return userQuery as User;

}

export function updatePoints(name: string, points: number) {
  const userToUpdate = getUser(name);

  if (!userToUpdate) {
    throw new Error(`User ${name} not found`);
  }
  const updatedPoints = (userToUpdate.points === null ? 0 : userToUpdate.points) + points;

  const sql = 'UPDATE customers SET points = ? WHERE name = ?';
  update(sql, [updatedPoints, userToUpdate.name])

  return;
}