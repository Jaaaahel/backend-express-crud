import bcrypt from 'bcrypt';

import { getUserByUsername, getAllUsers, getUserById, updateUserById, softDeleteUserById } from '../models/user.js';

export const getUsers = async (req, res) => {
    try {
        const users = await getAllUsers();

        res.json({
            message: 'Success',
            data: users.map(user => {
                return {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    createdAt: user.createdAt
                }
            })
        });
    } catch (e) {
        res.status(500).send(e);
    }
}

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await getUserById(id);
        if (user.length === 0) return res.status(404).send({ message: 'User not found' });

        res.json({
            message: 'Success',
            data: {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt
            }
        });
    } catch (e) {
        res.status(500).send(e);
    }
}

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const data = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }

    if (req.body.password) {
        const salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(req.body.password, salt);
    }

    try {
        const userExist = await getUserById(id);
        if (userExist.length === 0) return res.status(400).send({ message: 'User not found' });

        if (userExist[0].username !== req.body.username) {
            const userNameExist = await getUserByUsername(req.body.username);
            if (userNameExist.length > 0) return res.status(400).send({ message: 'Username already exist' });
        }

        const user = await updateUserById(id, data);

        res.json({ message: 'Success', data: user });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const userExist = await getUserById(id);
        if (userExist.length === 0) return res.status(400).send({ message: 'User not found' });

        await softDeleteUserById(id);

        res.status(200).send({ message: 'Success' });
    } catch (e) {
        res.status(500).send(e);
    }
}