import { getMany, update, getOne } from './db';
import { Item } from "@putiikki/item"
import { getGroupIdFromUuid } from './groups';

export async function getMultiple(page = 1) {
    const data = await getMany(`SELECT * FROM rewards`);

    const rewards: Item[] = data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return rewards;
}

export function addReward(reward: Omit<Item, 'uuid'>, groupUuid: string) {
    const sql = `
        INSERT INTO rewards (name, price, description, group_id, uuid)
        VALUES (
            $1, $2, $3,
            (SELECT id FROM groups WHERE uuid = $4),
             gen_random_uuid()
        )
    `;
    update(sql, [reward.name, reward.price, reward.description, groupUuid]);
}

export async function getGroupRewards(uuid: string, page = 1) {
    const groupId = await getGroupIdFromUuid(uuid);
    const sql = `SELECT * FROM rewards WHERE group_id = $1`;

    const data = await getMany(sql, [groupId]);

    return data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description, uuid: item.uuid
    }));

}

export async function getRewardIdByUuid(uuid: string): Promise<number> {
    const sql = `SELECT id FROM rewards WHERE uuid = $1`;
    const data = await getOne(sql, [uuid]);

    if (!data) {
        throw new Error('Reward not found');
    }

    return data.id;
}
