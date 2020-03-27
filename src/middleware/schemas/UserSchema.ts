import Joi from '@hapi/joi';

export const createUserSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(255)
        .required(),
    surname: Joi.string()
        .min(1)
        .max(255)
        .required(),
    dateOfBirth: Joi.date()
        .required()
});

export const updateUserSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(255),
    surname: Joi.string()
        .min(1)
        .max(255),
    dateOfBirth: Joi.date()
});
