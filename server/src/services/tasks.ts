import { getMany, update } from './db';

type Task = {
    name: string,
    price: number,
    description?: string
}

export function getMultiple(page = 1) {
    const data = getMany(`SELECT * FROM tasks`);

    const tasks: Task[] = data.map((item: Task) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}

export function addTask(task: Task) {
    const sql = `INSERT INTO tasks (name, price, description) VALUES (?, ?, ?)`;

    update(sql, [task.name, task.price, task.description]);
}
