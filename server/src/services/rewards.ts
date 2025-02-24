import { getMany, update } from './db';

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

export function addReward(reward: Reward) {
    const sql = `INSERT INTO rewards (name, price, description) VALUES (?, ?, ?)`;

    update(sql, [reward.name, reward.price, reward.description]);
}

