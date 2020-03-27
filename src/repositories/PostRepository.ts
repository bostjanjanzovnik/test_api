import { Repository } from './Repository';

class PostRepository extends Repository {
    index = 'posts';

    mapping = {
        id: {
            type: 'text',
            fields: {
                keyword: {
                    type: 'keyword',
                    ignore_above: 256
                }
            }
        },
        userId: {
            type: 'text',
            fields: {
                keyword: {
                    type: 'keyword',
                    ignore_above: 256
                }
            }
        },
        title: {
            type: 'text',
            fields: {
                keyword: {
                    type: 'keyword',
                    ignore_above: 256
                }
            }
        },
        content: {
            type: 'text',
            fields: {
                keyword: {
                    type: 'keyword',
                    ignore_above: 256
                }
            }
        },
        createdOn: {
            type: 'date'
        }
    };
}

export default new PostRepository();
