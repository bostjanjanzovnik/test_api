import Joi from '@hapi/joi'
import { HandledError } from '../errors/HandledError';
import { ErrorType } from '../interfaces/HandledError';

export const validateSchema = <T, S extends Joi.ObjectSchema>(object: T, validationSchema: S): void => {
    const { error } = validationSchema.validate(object);

    if (error) {
        throw new HandledError(ErrorType.Validation, error.details[0].message, 400);
    }
};
