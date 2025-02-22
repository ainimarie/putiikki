import express from 'express';
import { updatePoints } from '../services/users';
import { z, ZodError } from 'zod';
export const router = express.Router();

const userSchema = z.object({
  user: z.string(),
  points: z.number()
});

router.post('/', function (req, res, next) {
  try {
    const user = userSchema.parse(req.body)

    const name = user.user;
    const points = user.points;

    updatePoints(name, points);

    res.status(200).json('ok');

  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: 'Invalid data', details: err });
    }
    console.error(`Error while performing transaction `, err.message);
    res.status(500).json(err.message);
    next(err);
  }
});