import { query } from './db';

type Reward = {
    name: string,
    price: number,
    description?: string
}

export function getMultiple(page = 1) {
    const data = query(`SELECT * FROM rewards`);
    const meta = { page };

    const tasks: Reward[] = data.map((item: Reward) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}
