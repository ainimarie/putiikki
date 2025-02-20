import express from 'express';
const app = express();
const port = 3000;

import { router } from './routes/tasks';

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/tasks', router);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});