import express = require('express');

export default (fn: express.RequestHandler) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
