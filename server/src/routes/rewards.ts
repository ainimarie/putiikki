import express from 'express';
export const router = express.Router();
import { getMultiple } from '../services/rewards';

router.get('/', function (req, res, next) {
    try {
        const pageNumber: number = typeof req.query.page === 'string' && parseInt(req.query.page);
        res.json(getMultiple(pageNumber));
    } catch (err) {
        console.error(`Error while getting rewards `, err.message);
        next(err);
    }
});