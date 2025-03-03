import express from 'express';
import { hash } from 'bcryptjs';
export const router = express.Router();
import { addUser, fetchUser, User } from '../services/users';
import { createJWT } from '../util/auth';
import { z } from 'zod';

const saltRounds = 10;
const userRequestSchema = z.object({
  username: z.string().min(1, 'Käyttäjänimi on pakollinen'),
  password: z.string().min(6, 'Salasanan pitää olla vähintään 6 merkkiä pitkä'),
  name: z.string().min(1, 'Nimi on pakollinen'),
});

router.get('/:username', async function (req, res, next) {
  try {
    const name = req.params.username;
    const user = await fetchUser(name);

    res.json(user);
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});


router.post('/login', async function (req, res) {
  const data = req.body;
  let user: User;

  try {
    user = await fetchUser(data.username);
  } catch (err) {
    res.status(401).json({ message: 'Käyttäjänimi tai salasana on virheellinen' });
    return;
  }
  const token = createJWT(user.username);
  res.json({ token });

});

router.post('/signup', async function (req, res, next) {
  const data = userRequestSchema.parse(req.body);

  try {
    const existingUser = await fetchUser(data.username);
    if (existingUser) {
      res.status(401).json({ message: 'Käyttäjänimi on jo käytössä' });
    }
  } catch (err) {
    console.error(`Error while checking user `, err.message);
  }

  try {
    const hashedpassword = await hash(data.password, saltRounds)
    const newUser = { username: data.username, password: hashedpassword, name: data.name }
    await addUser(newUser);
    res.json(newUser);
  } catch (err) {
    console.error(`Error while adding user `, err.message);
    return;// next(err);
  }
});