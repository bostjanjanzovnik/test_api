import express from 'express';
import UserService from '../services/UserService';
import { CreateUserRequest, UpdateUserRequest } from '../interfaces/User';
import AsyncMiddleware from '../middleware/AsyncMiddleware';
import { validateSchema } from '../middleware/ValidateSchema';
import { createUserSchema, updateUserSchema } from '../middleware/schemas/UserSchema';
import { ObjectSchema } from '@hapi/joi';

const router = express.Router();

router.get(
    '/',
    AsyncMiddleware(async (req, res) => {
        res.send(await UserService.index());
    })
);

router.get(
    '/:id',
    AsyncMiddleware(async (req, res) => {
        res.send(await UserService.get(req.params.id));
    })
);

router.post(
    '/',
    AsyncMiddleware(async (req, res) => {
        const createUserRequest = req.body as CreateUserRequest;

        validateSchema<CreateUserRequest, ObjectSchema>(createUserRequest, createUserSchema);

        res.send(await UserService.add(createUserRequest)).status(201);
    })
);

router.patch(
    '/:id',
    AsyncMiddleware(async (req, res) => {
        const updateUserRequest = req.body as UpdateUserRequest;

        validateSchema<UpdateUserRequest, ObjectSchema>(updateUserRequest, updateUserSchema);

        res.send(await UserService.update(req.params.id, updateUserRequest));
    })
);

router.delete(
    '/:id',
    AsyncMiddleware(async (req, res) => {
        res.send(await UserService.delete(req.params.id));
    })
);

export default router;
