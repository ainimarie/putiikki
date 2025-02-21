import express from 'express';
export const router = express.Router();
import { getMultiple } from '../services/tasks';

router.get('/', function (req, res, next) {
    console.log("asljkd");
    try {
        const pageNumber: number = typeof req.query.page === 'string' && parseInt(req.query.page);
        console.log(getMultiple(1));
        res.json(getMultiple(pageNumber));
    } catch (err) {
        console.error(`Error while getting tasks `, err.message);
        next(err);
    }
});