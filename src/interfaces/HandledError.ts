export enum ErrorType {
    General = 'GENERAL_ERROR',
    Database = 'DATABASE_ERROR',
    ResourceNotFound = 'RESOURCE_NOT_FOUND',
    Validation = 'VALIDATION_ERROR'
}

export interface HandledError {
    message: string,
    type?: ErrorType,
    status?: number
}
