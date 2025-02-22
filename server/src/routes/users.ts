import express from 'express';
export const router = express.Router();
import { getUser } from '../services/users';

router.get('/:name', function (req, res, next) {
  try {
    const name = req.params.name;
    res.json(getUser(name));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});
