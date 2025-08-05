import { Item } from '@putiikki/item';
import { getMany, update } from './db';

export async function getMultiple() {
    const data = await getMany(`SELECT * FROM penalties`);

    const tasks: Item[] = data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}

export async function addPenalty(penalty: Item, groupId: number) {
    const sql = `INSERT INTO penalties (name, price, description, group_id) VALUES ($1, $2, $3, $4)`;

    await update(sql, [penalty.name, penalty.price, penalty.description, groupId]);
}


export async function getGroupPenalties(id, page = 1) {
    const sql = `SELECT * FROM penalties WHERE group_id = $1`;

    const data = await getMany(sql, [id]);

    return data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }));

}
