import express from 'express';
export const router = express.Router();
import { addPenalty, getMultiple } from '../services/penalties';
import { z } from 'zod';

const penaltySchema = z.object({
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
        const penalties = await getMultiple();
        res.json(penalties);
    } catch (err) {
        console.error(`Error while getting penalties `, err.message);
        next(err);
    }
});

router.post('/', async function (req, res, next) {
    try {
        const penalty = penaltySchema.parse(req.body);

        const item = {
            name: penalty.name,
            price: penalty.price,
            description: penalty.description || null
        }

        await addPenalty(item);
        res.status(200).json('ok');
    } catch (err) {
        console.error(`Error while adding penalty `, err.message);
        next(err);
    }
});