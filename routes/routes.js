import express from "express";

import { register } from "../controllers/register.js";
import { login } from "../controllers/login.js";
import { getUsers, getUser, updateUser, deleteUser } from "../controllers/users.js";
import { getDummyUsers } from "../controllers/dummy.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.get('/dummy', getDummyUsers);

export default router;