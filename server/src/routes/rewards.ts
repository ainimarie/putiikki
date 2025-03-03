import express from 'express';
export const router = express.Router();
import { addReward, getMultiple } from '../services/rewards';
import { z } from 'zod';

const rewardSchema = z.object({
    name: z.string(),
    price: z.string().transform((val, ctx) => {
        const parsed = parseInt(val);
        if (isNaN(parsed)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Not a number",
            });

            return z.NEVER;
        }
        return parsed;
    }),
    description: z.string().nullable()
});

router.get('/', async function (req, res, next) {
    try {
        const pageNumber: number = typeof req.query.page === 'string' && parseInt(req.query.page);
        const rewards = await getMultiple(pageNumber);
        res.json(rewards);
    } catch (err) {
        console.error(`Error while getting rewards `, err.message);
        next(err);
    }
});


router.post('/', function (req, res, next) {
    try {
        const reward = rewardSchema.parse(req.body);

        const item = {
            name: reward.name,
            price: reward.price,
            description: reward.description || null
        }

        addReward(item);
        res.status(200).json('ok');
    } catch (err) {
        console.error(`Error while adding reward `, err.message);
        next(err);
    }
});
