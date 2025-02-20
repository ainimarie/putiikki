import { query } from './db';

type Task = {
    name: string,
    price: number,
    description?: string
}

export function getMultiple(page = 1) {
    const data = query(`SELECT * FROM tasks`);
    const meta = { page };

    const tasks: Task[] = data.map((item: Task) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}
