import express from 'express';
import { hash } from 'bcryptjs';
export const router = express.Router();
import { addUser, getUser, getUserWithPassword } from '../services/users';
import { User } from "@putiikki/user";
import { createJWT } from '../util/auth';
import { z } from 'zod';

const saltRounds = 10;

//TODO: Better schemas
const userAuthSchema = z.object({
  username: z.string().min(1, 'Käyttäjänimi on pakollinen'),
  password: z.string().min(6, 'Salasanan pitää olla vähintään 6 merkkiä pitkä'),
});

const userRequestSchema = z.object({
  username: z.string().min(1, 'Käyttäjänimi on pakollinen'),
  password: z.string().min(6, 'Salasanan pitää olla vähintään 6 merkkiä pitkä'),
  name: z.string().min(1, 'Nimi on pakollinen'),
});

router.get('/:username', async function (req, res, next) {
  try {
    const name = req.params.username;
    const user = await getUser(name);

    res.json(user);
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});


router.post('/login', async function (req, res) {
  let user: string;

  try {
    const data = userAuthSchema.parse(req.body);
    user = await getUserWithPassword({ username: data.username, password: data.password });
    const token = createJWT(user);
    res.json({ token });

  } catch (err) {
    res.status(401).json({ message: 'Käyttäjänimi tai salasana on virheellinen' });
  }
});

router.post('/signup', async function (req, res, next) {
  try {
    const data = userRequestSchema.parse(req.body);
    const existingUser = await getUser(data.username);

    if (existingUser) {
      res.status(401).json({ message: 'Käyttäjänimi on jo käytössä' });
    }

    const hashedpassword = await hash(data.password, saltRounds)
    const newUser = { username: data.username, password: hashedpassword, name: data.name }

    await addUser(newUser).then(() => res.json(newUser));
  } catch (err) {
    console.error(`Error while checking user `, err.message);
    res.status(400);
  }
});