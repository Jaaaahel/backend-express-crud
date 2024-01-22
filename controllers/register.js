import bcrypt from 'bcrypt';

import { getUserByUsername, insertUser } from '../models/user.js';

export const register = async (req, res) => {
    const username = req.body.username;
    if (!username) return res.status(400).send({ message: 'Username is required' });

    const password = req.body.password;
    if (!password) return res.status(400).send({ message: 'Password is required' });

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    try {
        const user = await getUserByUsername(username);
        if (user.length !== 0) return res.status(400).send({ message: 'Username already exist' });

        await insertUser({
            username,
            password: hashPassword,
            firstName: req.body.firstName || '',
            lastName: req.body.lastName || ''
        });

        res.json({ message: 'Success' });
    } catch (e) {
        res.status(500).send(e);
    }
}