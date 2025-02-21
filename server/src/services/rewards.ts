import { getMany } from './db';

type Reward = {
    name: string,
    price: number,
    description?: string
}

export function getMultiple(page = 1) {
    const data = getMany(`SELECT * FROM rewards`);

    const tasks: Reward[] = data.map((item: Reward) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}
