import { IndicesPutMappingParams } from 'elasticsearch';

export interface PutMappings extends IndicesPutMappingParams {
    include_type_name?: boolean;
}

export interface IndexConfig {
    index: string,
    mapping: object
}
