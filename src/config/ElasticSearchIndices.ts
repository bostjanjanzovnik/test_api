import UserRepository from '../repositories/UserRepository';
import PostRepository from '../repositories/PostRepository';

interface Indices {
    index?: string,
    mapping?: object
}

export default class ElasticSearchIndices {
    public readonly indices: Indices[];

    constructor() {
        this.indices = [
            {
                index: UserRepository.index,
                mapping: UserRepository.mapping
            },
            {
                index: PostRepository.index,
                mapping: PostRepository.mapping
            }
        ];
    }
}
