import express from 'express';
import { ObjectSchema } from '@hapi/joi';
import AsyncMiddleware from '../middleware/AsyncMiddleware';
import { validateSchema } from '../middleware/ValidateSchema';
import { CreatePostRequest } from '../interfaces/Post';
import { createPostSchema } from '../middleware/schemas/PostSchema';
import PostService from '../services/PostService';

const router = express.Router();

router.post(
    '/',
    AsyncMiddleware(async (req, res) => {
        const createPostRequest = req.body as CreatePostRequest;

        validateSchema<CreatePostRequest, ObjectSchema>(createPostRequest, createPostSchema);

        res.send(await PostService.add(createPostRequest)).status(201);
    })
);

router.delete(
    '/:id',
    AsyncMiddleware(async (req, res) => {
        res.send(await PostService.delete(req.params.id));
    })
);

export default router;
