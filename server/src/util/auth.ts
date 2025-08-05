import { sign, verify } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

const KEY = process.env.JWT_SECRET || 'secret';

export function createJWT(username: string) {
  console.log(username)
  return sign({ username }, KEY, { expiresIn: '5h' });
}

export function verifyJWT(token: string) {
  return verify(token, KEY);
}

export function isValidPassword(password: string, storedPassword: string) {
  return compare(password, storedPassword);
}