import express from 'express';
export const router = express.Router();
import { addTask, getMultiple } from '../services/tasks';
import { z } from 'zod';

const taskSchema = z.object({
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
        // pageNumber not used at the moment, but maybe at some point.
        const pageNumber: number = typeof req.query.page === 'string' && parseInt(req.query.page);
        const tasks = await getMultiple(pageNumber)
        res.json(tasks);
    } catch (err) {
        console.error(`Error while getting tasks `, err.message);
        next(err);
    }
});

router.post('/', function (req, res, next) {
    try {
        const taskToBeAdded = taskSchema.parse(req.body);

        const task = {
            name: taskToBeAdded.name,
            price: taskToBeAdded.price,
            description: taskToBeAdded.description || null
        }

        addTask(task);
        res.status(200).json('ok');
    } catch (err) {
        console.error(`Error while adding task `, err.message);
        next(err);
    }
});
