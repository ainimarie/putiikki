import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function getMany(sql: string, params?: any[]) {
    const client = await pool.connect();
    try {
        console.log("SQL", sql)
        console.log("params", params)
        const res = await client.query(sql, params);
        console.log("response", res)
        return res.rows;
    } finally {
        client.release();
    }
}

export async function getOne(sql: string, params?: any[]) {
    const client = await pool.connect();
    try {
        const res = await client.query(sql, params);
        if (res.rowCount <= 0) {
            return;
        }
        return res.rows[0];
    } finally {
        client.release();
    }
}

// await client.query('BEGIN')
// const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
// const res = await client.query(queryText, ['brianc'])

// const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
// const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
// await client.query(insertPhotoText, insertPhotoValues)
// await client.query('COMMIT')

export async function update(sql: string, params: any[]) {
    const client = await pool.connect();
    try {
        await client.query('BEGIN')
        const res = await client.query(sql, params);
        await client.query('COMMIT')
        return res;
    } catch (e) {
        await client.query('ROLLBACK')
        throw e;
    } finally {
        client.release();
    }
}