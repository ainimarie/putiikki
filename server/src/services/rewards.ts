import { getMany, update } from './db';

type Reward = {
    name: string,
    price: number,
    description?: string
}

export async function getMultiple(page = 1) {
    const data = await getMany(`SELECT * FROM rewards`);

    const rewards: Reward[] = data.map((item: Reward) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return rewards;
}

export function addReward(reward: Reward) {
    const sql = `INSERT INTO rewards (name, price, description) VALUES ($1, $2, $3)`;
    update(sql, [reward.name, reward.price, reward.description]);
}

