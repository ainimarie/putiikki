import { getMany, update } from './db';

type Penalty = {
    name: string,
    price: number,
    description?: string
}

export async function getMultiple() {
    const data = await getMany(`SELECT * FROM penalties`);

    const tasks: Penalty[] = data.map((item: Penalty) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}

export async function addPenalty(penalty: Penalty) {
    const sql = `INSERT INTO penalties (name, price, description) VALUES ($1, $2, $3)`;

    await update(sql, [penalty.name, penalty.price, penalty.description]);
}
