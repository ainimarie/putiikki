import express from 'express';
import { updatePoints } from '../services/users';
import { z, ZodError } from 'zod';
import { updateUserPoints } from 'src/services/groups';
export const router = express.Router();

const userGroupSchema = z.object({
  username: z.string(),
  group: z.number().or(z.string()),
  points: z.number().nullable()
});

router.post('/', function (req, res, next) {
  try {
    const user = userGroupSchema.parse(req.body)

    const username = user.username;
    const points = user.points;
    const groupId = user.group;

    // updatePoints(username, points);
    updateUserPoints(groupId, username, points)


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