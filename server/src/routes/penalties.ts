import express from 'express';
export const router = express.Router();
import { getMultiple } from '../services/penalties';

router.get('/', function (req, res, next) {
    try {
        res.json(getMultiple());
    } catch (err) {
        console.error(`Error while getting penalties `, err.message);
        next(err);
    }
});