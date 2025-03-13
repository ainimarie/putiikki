import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function getMany(sql: string, params?: any[]) {
    const client = await pool.connect();
    try {
        const res = await client.query(sql, params);
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

export async function update(sql: string, params: any[]) {
    const client = await pool.connect();
    try {
        await client.query(sql, params);
    } finally {
        client.release();
    }
}