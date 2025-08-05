import { getMany, update } from './db';
import { Item } from "@putiikki/item"

export async function getMultiple(page = 1) {
    const data = await getMany(`SELECT * FROM rewards`);

    const rewards: Item[] = data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return rewards;
}

export function addReward(reward: Item, groupId: number) {
    const sql = `INSERT INTO rewards (name, price, description, group_id) VALUES ($1, $2, $3, $4)`;
    update(sql, [reward.name, reward.price, reward.description, groupId]);
}

export async function getGroupRewards(id, page = 1) {
    const sql = `SELECT * FROM rewards WHERE group_id = $1`;

    const data = await getMany(sql, [id]);

    return data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }));

}
