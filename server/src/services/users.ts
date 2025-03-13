import { compare } from 'bcryptjs';
import { getOne, update } from './db';

// TODO: Add some typechecks ( ﾉ ﾟｰﾟ)ﾉ
export type User = {
  name: string,
  username: string,
  points: number,
}

type AuthData = {
  username: string,
  password: string,
}

type UserRow = User & AuthData

export async function fetchUser(username: string): Promise<User> {
  const userQuery: UserRow | undefined = await getOne('SELECT * FROM customers WHERE username = LOWER($1)', [username])

  if (userQuery !== undefined) {
    return {
      username: userQuery.username,
      name: userQuery.name,
      points: userQuery.points
    };
  }
}

export async function getUserWithPassword(user: AuthData): Promise<User> {
  const userQuery = await getOne('SELECT * FROM customers WHERE username = LOWER($1)', [user.username]);

  const passwordMatch = await compare(user.password, userQuery.pword)

  if (userQuery && passwordMatch)
    return {
      name: userQuery.name || '',
      points: userQuery.points,
      username: userQuery.username
    };
}

export async function addUser(user: AuthData & { name: string }): Promise<User> {
  const sql = 'INSERT INTO customers (username, points, pword, name) VALUES ($1, 0, $2, $3)';
  await update(sql, [user.username, user.password, user.name]);
  return;
}

export async function updatePoints(username: string, points: number) {
  const userToUpdate = await fetchUser(username);

  if (!userToUpdate) {
    throw new Error(`User ${username} not found`);
  }
  const updatedPoints = (userToUpdate.points === null ? 0 : userToUpdate.points) + points;

  const sql = 'UPDATE customers SET points = $1 WHERE username = $2';
  await update(sql, [updatedPoints, userToUpdate.username]);

  return;
}