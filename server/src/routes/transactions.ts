import express from 'express';
import { getUserId, updatePoints } from '../services/users';
import { z, ZodError } from 'zod';
import { getGroupIdFromUuid, updateUserPoints } from 'src/services/groups';
import { addHistoryTransaction } from 'src/services/transactions';
export const router = express.Router();

const transactionSchema = z.object({
  username: z.string(),
  group: z.string(),
  points: z.number().nullable(),
  sourceType: z.enum(['task', 'reward', 'penalty']),
  sourceId: z.string(),
});

router.post('/', async function (req, res, next) {
  try {
    const user = transactionSchema.parse(req.body)
    const { username, points, group, sourceType, sourceId } = user;
    const groupId = await getGroupIdFromUuid(group);

    const updateResult = await updateUserPoints(groupId, username, points)
    const userId = await getUserId(username);

    if (updateResult === 'ok') {
      await addHistoryTransaction(
        userId,
        groupId,
        sourceType,
        sourceId,
        points
      );
    }

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

// // GET transactions with optional filters
// GET /transactions?user_id=5&source_type=task&from=2025-08-01&to=2025-08-08