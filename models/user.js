import db from '../config/database.js';

const tableName = 'users';

export const getUserByUsername = async (username) => {
    const sql = `SELECT * FROM ${tableName} WHERE username = ? and deletedAt IS NULL`;
    const value = [username];

    try {
        const [rows, fields] = await db.execute(sql, value);

        return rows;
    } catch(e) {
        return e;
    }
}

export const getAllUsers = async () => {
    const sql = `SELECT * FROM ${tableName} where deletedAt IS NULL`;

    try {
        const [rows, fields] = await db.execute(sql);

        return rows;
    } catch(e) {
        return e;
    }
}

export const getUserById = async (id) => {
    const sql = `SELECT * FROM ${tableName} WHERE id = ? and deletedAt IS NULL`;
    const value = [id];

    try {
        const [rows, fields] = await db.execute(sql, value);

        return rows;
    } catch(e) {
        return e;
    }
}

export const insertUser = async (data) => {
    const sql = `INSERT INTO ${tableName} SET ?`;
    const value = [data];

    try {
        await db.query(sql, value);
    } catch(e) {
        return e;
    }
}

export const updateUserById = async (id, data) => {
    const sql = `UPDATE ${tableName} SET ? WHERE id = ?`;
    const value = [data, id];

    try {
        await db.query(sql, value);
    } catch(e) {
        return e;
    }
}

export const softDeleteUserById = async (id) => {
    const sql = `UPDATE ${tableName} SET deletedAt = CURRENT_TIMESTAMP() WHERE id = ?`;
    const value = [id];

    try {
        await db.query(sql, value);
    } catch(e) {
        return e;
    }
}