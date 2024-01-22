import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getUserByUsername } from '../models/user.js';

const secretKey = process.env.SECRET_KEY;

export const login = async (req, res) => {
    const username = req.body.username;
    if (!username) return res.status(400).send({ message: 'Username is required' });

    const password = req.body.password;
    if (!password) return res.status(400).send({ message: 'Password is required' });

    try {
        const user = await getUserByUsername(username);
        if (user.length === 0) return res.status(404).send({ message: 'Incorrect credentials' });

        if (!bcrypt.compareSync(password, user[0].password)) return res.status(400).send({ message: 'Incorrect credentials' });

        res.json({
            message: 'Success',
            data: {
                token: jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' }),
                user: user
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}