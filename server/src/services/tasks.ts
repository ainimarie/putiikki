import { Item } from '@putiikki/item';
import { getMany, getOne, update } from './db';
import { getGroupIdFromUuid } from './groups';

export async function getMultiple(page = 1) {
    const data = await getMany(`SELECT * FROM tasks`);

    const tasks: Item[] = data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}

export function addTask(task: Omit<Item, 'uuid'>, groupUuid: string) {
    const sql = `
        INSERT INTO tasks (name, price, description, group_id, uuid)
        VALUES (
            $1, $2, $3,
            (SELECT id FROM groups WHERE uuid = $4),
            gen_random_uuid()
        )
    `;
    update(sql, [task.name, task.price, task.description, groupUuid]);
}

export async function getGroupTasks(uuid: string, page = 1) {
    const groupId = await getGroupIdFromUuid(uuid);
    const sql = `SELECT * FROM tasks WHERE group_id = $1`;

    const data = await getMany(sql, [groupId]);

    return data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description, uuid: item.uuid
    }));

}

export async function getTaskIdByUuid(uuid: string): Promise<number> {
    const sql = `SELECT id FROM tasks WHERE uuid = $1`;
    const data = await getOne(sql, [uuid]);

    if (!data) {
        throw new Error('Task not found');
    }

    return data.id;
}

export async function getTaskByUuid(uuid: string): Promise<Item | undefined> {
    const sql = `SELECT * FROM tasks WHERE uuid = $1`;
    const data = await getMany(sql, [uuid]);

    if (data.length === 0) {
        return undefined;
    }

    const item = data[0];
    return {
        name: item.name,
        price: item.price,
        description: item.description,
        uuid: item.uuid
    };
}
