import { getMany, update } from './db';
import { Item } from "@putiikki/item"

export async function getMultiple(page = 1) {
    const data = await getMany(`SELECT * FROM rewards`);

    const rewards: Item[] = data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return rewards;
}

export function addReward(reward: Item) {
    const sql = `INSERT INTO rewards (name, price, description) VALUES ($1, $2, $3)`;
    update(sql, [reward.name, reward.price, reward.description]);
}

