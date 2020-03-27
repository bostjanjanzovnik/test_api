import { ErrorType } from '../interfaces/HandledError';

export class HandledError extends Error {
    public type: ErrorType;
    public message: string;
    public status: number | undefined;

    constructor(type: ErrorType, message: string, status?: number) {
        super(message);
        this.type = type;
        this.status = status;
    }
}
