import { compare } from 'bcryptjs';
import { getMany, getOne, update } from './db';
import { AuthData, User } from '@putiikki/user';

type UserRow = User & AuthData

export async function getUser(username: string): Promise<User> {
  const userQuery: UserRow | undefined = await getOne('SELECT * FROM customers WHERE username = LOWER($1)', [username]);
  const groupQuery = await getMany('SELECT g.name, gm.is_leader, g.id FROM groups g JOIN group_members gm ON g.id = gm.group_id WHERE gm.customer_id = (SELECT id FROM customers WHERE username = LOWER($1))', [username])

  const groups = groupQuery.map((group) => ({
    name: group.name,
    isLeader: group.is_leader,
    uuid: group.id.toString()
  }));

  if (userQuery !== undefined) {
    return {
      username: userQuery.username,
      name: userQuery.name,
      points: userQuery.points,
      groups
    };
  }
}

export async function getUserId(username: string): Promise<number> {
  const userQuery = await getOne('SELECT id FROM customers WHERE username = LOWER($1)', [username]);
  if (userQuery === undefined) {
    throw new Error('User not found');
  }
  const userId = userQuery.id;

  return userId;
}

export async function getUserWithPassword(user: AuthData): Promise<string> {
  const userQuery = await getOne('SELECT * FROM customers WHERE username = LOWER($1)', [user.username]);

  const passwordMatch = await compare(user.password, userQuery.pword)

  if (userQuery && passwordMatch)
    return userQuery.username;
  // name: userQuery.name || '',
  // points: userQuery.points,
  // username: userQuery.username,
  // groups: [{ name: "Makkara", uuid: "jotain", isLeader: false }]
  // };
}

export async function addUser(user: AuthData & { name: string }): Promise<User> {
  const sql = 'INSERT INTO customers (username, points, pword, name) VALUES ($1, 0, $2, $3)';
  await update(sql, [user.username, user.password, user.name]);
  return;
}

export async function updatePoints(username: string, points: number) {
  const userToUpdate = await getUser(username);

  if (!userToUpdate) {
    throw new Error(`User ${username} not found`);
  }
  const updatedPoints = (userToUpdate.points === null ? 0 : userToUpdate.points) + points;

  const sql = 'UPDATE customers SET points = $1 WHERE username = $2';
  await update(sql, [updatedPoints, userToUpdate.username]);

  return;
}