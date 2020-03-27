import express = require('express');
import { HandledError } from '../interfaces/HandledError';

export function errorHandler(): (err: HandledError, req: express.Request, res: express.Response, next: express.NextFunction) => void {
    return (err, _req, res, _next) => {
        const status = err.status ?? 500;
        const message = err.type ? `[${err.type}] ${err.message}` : err.message;

        const response = {
          message,
          code: status,
        };

        res.status(status);
        res.json(response);
    }
}
