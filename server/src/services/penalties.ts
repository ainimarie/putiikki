import { Item } from '@putiikki/item';
import { getMany, update, getOne } from './db';
import { getGroupIdFromUuid } from './groups';

export async function getMultiple() {
    const data = await getMany(`SELECT * FROM penalties`);

    const tasks: Item[] = data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description
    }))

    return tasks;
}

export async function addPenalty(penalty: Omit<Item, 'uuid'>, groupUuid: string) {
    const sql = `
        INSERT INTO penalties (name, price, description, group_id, uuid)
        VALUES (
            $1, $2, $3,
            (SELECT id FROM groups WHERE uuid = $4),
            gen_random_uuid()
        )
    `;

    await update(sql, [penalty.name, penalty.price, penalty.description, groupUuid]);
}


export async function getGroupPenalties(uuid: string, page = 1) {
    const groupId = await getGroupIdFromUuid(uuid);
    const sql = `SELECT * FROM penalties WHERE group_id = $1`;

    const data = await getMany(sql, [groupId]);

    return data.map((item: Item) => ({
        name: item.name, price: item.price, description: item.description, uuid: item.uuid
    }));

}

export async function getPenaltyIdByUuid(uuid: string): Promise<number> {
    const sql = `SELECT id FROM penalties WHERE uuid = $1`;
    const data = await getOne(sql, [uuid]);

    if (!data) {
        throw new Error('Penalty not found');
    }

    return data.id;
}
