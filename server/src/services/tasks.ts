import { Item } from '@putiikki/item';
import { getMany, update } from './db';

export async function getMultiple(page = 1) {
    const data = await getMany(`SELECT * FROM tasks`);

    const tasks: Item[] = data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}

export function addTask(task: Item, groupId: number) {
    const sql = `INSERT INTO tasks (name, price, description, group_id) VALUES ($1, $2, $3, $4)`;

    update(sql, [task.name, task.price, task.description, groupId]);
}

export async function getGroupTasks(id, page = 1) {
    const sql = `SELECT * FROM tasks WHERE group_id = $1`;

    const data = await getMany(sql, [id]);

    return data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }));

}