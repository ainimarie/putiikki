import express from 'express';
export const router = express.Router();
import { addPenalty, getMultiple } from '../services/penalties';
import { z } from 'zod';

const penaltySchema = z.object({
    name: z.string(),
    price: z.number(),
    description: z.string().nullable()
});

router.get('/', function (req, res, next) {
    try {
        res.json(getMultiple());
    } catch (err) {
        console.error(`Error while getting penalties `, err.message);
        next(err);
    }
});

router.post('/', function (req, res, next) {
    try {
        const penalty = penaltySchema.parse(req.body);

        const item = {
            name: penalty.name,
            price: penalty.price,
            description: penalty.description || null
        }

        addPenalty(item);
        res.status(200).json('ok');
    } catch (err) {
        console.error(`Error while adding penalty `, err.message);
        next(err);
    }
});