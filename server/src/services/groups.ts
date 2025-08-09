import { getMany, getOne, update } from './db';
import { getUserId } from './users';

type GroupRequest = {
    username: string,
    name: string,
    description: string | null
}

export async function addGroup(group: GroupRequest) {
    const sql = `INSERT INTO groups (name, description, uuid) VALUES ($1, $2, gen_random_uuid()) RETURNING id`;
    const updateResult = await update(sql, [group.name, group.description]);

    if (updateResult.rows.length === 0) {
        throw new Error('Group not found');
    }

    const user = await getOne('SELECT * FROM customers WHERE username = LOWER($1)', [group.username]);

    if (user === null) {
        throw new Error('User not found');
    }
    try {
        // TODO: make sure only one leader per group
        await update(`INSERT INTO group_members (group_id, customer_id, is_leader) VALUES ($1, $2, $3)`, [updateResult.rows[0].id, user.id, true])

    } catch (error) {
        console.log(error)
        throw new Error('Error adding group member');
    }
}

export async function getGroupIdFromUuid(uuid: string): Promise<number> {
    const query = await getOne('SELECT id FROM groups WHERE uuid = $1', [uuid]);
    if (query === undefined) {
        throw new Error('Group not found');
    }
    console.log("getGroupIdFromUuid", query)
    const groupId = query.id;

    return groupId;
}

export async function getGroupId(name: string): Promise<number> {
    const query = await getOne('SELECT id FROM groups WHERE name = LOWER($1)', [name]);
    if (query === undefined) {
        throw new Error('Group not found');
    }
    const groupId = query.id;

    return groupId;
}

//REDO with uuid
export async function addMemberToGroup(groupName: string, username: string) {
    const userId = await getUserId(username);

    if (userId === null || userId === undefined) {
        throw new Error('User not found');
    }

    const groupId = await getGroupId(groupName);
    if (groupId === null || groupId === undefined) {
        throw new Error('Group not found');
    }


    try {
        await update(`INSERT INTO group_members (group_id, customer_id, is_leader) VALUES ($1, $2, $3)`, [groupId, userId, false])
    } catch (error) {
        console.log(error)
        throw new Error('Error adding group member');
    }
}


type MemberRow = {
    member_name: string,
    username: string,
    points: number,
    is_leader: boolean
}

export async function getGroupWithMembers(groupId: string) {
    const query = await getMany('SELECT g.id, g.name, g.description, g.uuid, c.id AS member_id, c.username, c.name AS member_name, gm.points, gm.is_leader FROM groups g JOIN group_members gm ON g.id = gm.group_id JOIN customers c ON gm.customer_id = c.id WHERE g.uuid = $1', [groupId]);

    if (!query || query.length === 0) {
        throw new Error('Group not found');
    }

    return {
        name: query[0].name,
        uuid: query[0].uuid,
        members: query.map((row: MemberRow) => ({
            username: row.username,
            name: row.member_name,
            points: row.points,
            isLeader: row.is_leader
        }))
    }
}

export async function getMemberWithinGroup(uuid: string, username: string) {
    const groupId = await getGroupIdFromUuid(uuid);
    const query = await getOne('SELECT c.id AS member_id, c.username, c.name AS member_name, gm.points, gm.is_leader FROM groups g JOIN group_members gm ON g.id = gm.group_id JOIN customers c ON gm.customer_id = c.id WHERE g.id = $1 and c.username = $2', [groupId, username]);

    if (!query) {
        throw new Error('Group not found');
    }

    return {
        username: query.username,
        name: query.member_name,
        points: query.points,
        isLeader: query.is_leader
    }
}

export async function updateUserPoints(groupId: number, username: string, points: number | string) {
    const query = await update('UPDATE group_members SET points = points + $1 WHERE group_id = $2 AND customer_id = (SELECT id FROM customers WHERE username = $3)', [points, groupId, username]);
    if (query.rowCount === 0) {
        throw new Error('Failed to update user points');
    }
    return 'ok';
}
