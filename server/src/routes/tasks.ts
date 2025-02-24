import express from 'express';
export const router = express.Router();
import { getMultiple } from '../services/tasks';

router.get('/', function (req, res, next) {
    try {
        // pageNumber not used at the moment, but maybe at some point.
        const pageNumber: number = typeof req.query.page === 'string' && parseInt(req.query.page);
        res.json(getMultiple(pageNumber));
    } catch (err) {
        console.error(`Error while getting tasks `, err.message);
        next(err);
    }
});