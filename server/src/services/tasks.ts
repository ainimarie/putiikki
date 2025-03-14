import { Item } from '@putiikki/item';
import { getMany, update } from './db';

export async function getMultiple(page = 1) {
    const data = await getMany(`SELECT * FROM tasks`);

    const tasks: Item[] = data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}

export function addTask(task: Item) {
    const sql = `INSERT INTO tasks (name, price, description) VALUES ($1, $2, $3)`;

    update(sql, [task.name, task.price, task.description]);
}
