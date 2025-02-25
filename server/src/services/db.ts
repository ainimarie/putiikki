import sqlite from 'better-sqlite3';
import path from 'path';
const db = new sqlite(path.resolve(process.env.DB), { fileMustExist: true });

// removes slight lagging with some caveats
// https://www.sqlite.org/wal.html
db.pragma('journal_mode = WAL');

export function getMany(sql: string, params?) {
    if (params) {
        return db.prepare(sql).all(params)
    } else
        return db.prepare(sql).all();
}

export function getOne(sql: string, params?) {
    if (params) {
        return db.prepare(sql).get(params)
    } else
        return db.prepare(sql).get();
}

export function update(sql: string, params: any) {
    db.prepare(sql).run(params);
}