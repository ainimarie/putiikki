import { Item } from '@putiikki/item';
import { getMany, update } from './db';

export async function getMultiple() {
    const data = await getMany(`SELECT * FROM penalties`);

    const tasks: Item[] = data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}

export async function addPenalty(penalty: Item) {
    const sql = `INSERT INTO penalties (name, price, description) VALUES ($1, $2, $3)`;

    await update(sql, [penalty.name, penalty.price, penalty.description]);
}
