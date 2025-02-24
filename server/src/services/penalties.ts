import { getMany } from './db';

type Penalty = {
    name: string,
    price: number,
    description?: string
}

export function getMultiple() {
    const data = getMany(`SELECT * FROM penalties`);

    const tasks: Penalty[] = data.map((item: Penalty) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}
