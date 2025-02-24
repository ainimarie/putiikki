import express from 'express';
export const router = express.Router();
import { addReward, getMultiple } from '../services/rewards';
import { z } from 'zod';

const rewardSchema = z.object({
    name: z.string(),
    price: z.number(),
    description: z.string().nullable()
});

router.get('/', function (req, res, next) {
    try {
        const pageNumber: number = typeof req.query.page === 'string' && parseInt(req.query.page);
        res.json(getMultiple(pageNumber));
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
