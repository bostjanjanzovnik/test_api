import Joi from '@hapi/joi';

export const createPostSchema = Joi.object({
    userId: Joi.string()
        .min(1)
        .max(100)
        .required(),
    title: Joi.string()
        .min(1)
        .max(50)
        .required(),
    content: Joi.string()
        .min(1)
        .max(255)
        .required()
});
