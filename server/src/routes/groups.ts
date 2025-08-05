import express from 'express';
export const router = express.Router();
import { addGroup, addMemberToGroup, getGroupWithMembers as getGroupWithMembers, getMemberWithinGroup as getMemberWithinGroup } from '../services/groups';
import { addTask, getGroupTasks } from 'src/services/tasks';
import { addReward, getGroupRewards } from 'src/services/rewards';
import { addPenalty, getGroupPenalties } from 'src/services/penalties';
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

router.post('/', async function (req, res, next) {
    try {
        const groupToAdd = req.body;

        const group = {
            username: groupToAdd.username,
            name: groupToAdd.name,
            description: groupToAdd.description || null
        }

        await addGroup(group);
        res.status(200).json('ok');
    } catch (err) {
        console.error(`Error while adding group `, err.message);
        next(err);
    }
});

router.put('/', async function (req, res, next) {
    try {

        const groupToAdd = req.body;

        const userToAdd = groupToAdd.username;
        const group = groupToAdd.group;

        await addMemberToGroup(group, userToAdd);
        res.status(200).json('ok');
    } catch (err) {
        console.error(`Error while adding group `, err.message);
        next(err);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const groupId = parseInt(req.params.id);
        const group = await getGroupWithMembers(groupId);
        res.status(200).json(group);
    } catch (err) {
        console.error(`Error while getting group `, err.message);
        next(err);
    }
});

router.get('/:id/users', async function (req, res, next) {
    try {
        const groupId = parseInt(req.params.id);

        const group = await getGroupWithMembers(groupId);
        res.status(200).json(group);
    } catch (err) {
        console.error(`Error while getting group `, err.message);
        next(err);
    }
});

router.get('/:id/users/:username', async function (req, res, next) {
    try {
        const groupId = parseInt(req.params.id);
        const username = req.params.username;
        const group = await getMemberWithinGroup(groupId, username);
        res.status(200).json(group);
    } catch (err) {
        console.error(`Error while getting group `, err.message);
        next(err);
    }
});


router.get('/:id/tasks', async function (req, res, next) {
    try {
        const groupId = parseInt(req.params.id);

        const group = await getGroupTasks(groupId);
        res.status(200).json(group);
    } catch (err) {
        console.error(`Error while getting group `, err.message);
        next(err);
    }
});

router.get('/:id/rewards', async function (req, res, next) {
    try {
        const groupId = parseInt(req.params.id);

        const group = await getGroupRewards(groupId);
        res.status(200).json(group);
    } catch (err) {
        console.error(`Error while getting group `, err.message);
        next(err);
    }
});

router.get('/:id/penalties', async function (req, res, next) {
    try {
        const groupId = parseInt(req.params.id);

        const group = await getGroupPenalties(groupId);
        res.status(200).json(group);
    } catch (err) {
        console.error(`Error while getting group `, err.message);
        next(err);
    }
});

router.post('/:id/tasks', function (req, res, next) {
    try {
        const taskToBeAdded = taskSchema.parse(req.body);

        const task = {
            name: taskToBeAdded.name,
            price: taskToBeAdded.price,
            description: taskToBeAdded.description || null
        }

        addTask(task, parseInt(req.params.id));
        res.status(200).json('ok');
    } catch (err) {
        console.error(`Error while adding task `, err.message);
        next(err);
    }
});

router.post('/:id/rewards', function (req, res, next) {
    try {
        const rewardToBeAdded = taskSchema.parse(req.body);

        const task = {
            name: rewardToBeAdded.name,
            price: rewardToBeAdded.price,
            description: rewardToBeAdded.description || null
        }

        addReward(task, parseInt(req.params.id));
        res.status(200).json('ok');
    } catch (err) {
        console.error(`Error while adding task `, err.message);
        next(err);
    }
});

router.post('/:id/penalties', function (req, res, next) {
    try {
        const penaltyToBeAdded = taskSchema.parse(req.body);

        const task = {
            name: penaltyToBeAdded.name,
            price: penaltyToBeAdded.price,
            description: penaltyToBeAdded.description || null
        }

        addPenalty(task, parseInt(req.params.id));
        res.status(200).json('ok');
    } catch (err) {
        console.error(`Error while adding task `, err.message);
        next(err);
    }
});