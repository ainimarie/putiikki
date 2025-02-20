import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;

import { router as taskRouter } from './routes/tasks';
import { router as rewardRouter } from './routes/rewards';

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/tasks', taskRouter);
app.use('/rewards', rewardRouter);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});