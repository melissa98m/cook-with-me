import mysql, { MysqlError } from 'mysql';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const connection : mysql.Connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

export interface User {
    id: number;
    name: string;
    email: string;
    password: string

}

export const createUser = (name: string, email: string, password: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (hashError, hashedPassword) => {
            if (hashError) {
                reject(hashError);
            } else {
                connection.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (error: MysqlError | null, results: any): void => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results.insertId);
                    }
                });
            }
        });
    });
};
export const getUsers = (): Promise<User[]> => {
    return new Promise((resolve, reject): void => {
        connection.query('SELECT * FROM users', (error: MysqlError | null, results: any[]): void => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

export const getUserById = (userId: number ): Promise<User | null> => {
    return new Promise((resolve, reject):void => {
        connection.query('SELECT * FROM users WHERE id = ?', [userId], (error: MysqlError | null, results: any[]): void => {
            if (error) {
                reject(error);
            } else {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            }
        });
    });
};

export const updateUser = (userId: string, name: string, email: string): Promise<void> => {
    return new Promise((resolve, reject): void => {
        connection.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId], (error: MysqlError | null) :void => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};

export const deleteUser = (userId: number): Promise<void> => {
    return new Promise((resolve, reject) : void => {
        connection.query('DELETE FROM users WHERE id = ?', [userId], (error: MysqlError | null): void => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};