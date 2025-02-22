import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

import { router as taskRouter } from './routes/tasks';
import { router as rewardRouter } from './routes/rewards';
import { router as userRouter } from './routes/users';
import { router as transactionRouter } from './routes/transactions';

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', userRouter);
app.use('/tasks', taskRouter);
app.use('/rewards', rewardRouter);
app.use('/transactions', transactionRouter);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});