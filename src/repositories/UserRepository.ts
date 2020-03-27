import { Repository } from './Repository';

class UserRepository extends Repository {
    index = 'users';

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
        name: {
            type: 'text',
            fields: {
                keyword: {
                    type: 'keyword',
                    ignore_above: 256
                }
            }
        },
        surname: {
            type: 'text',
            fields: {
                keyword: {
                    type: 'keyword',
                    ignore_above: 256
                }
            }
        },
        dateOfBirth: {
            type: 'date'
        },
        createdOn: {
            type: 'date'
        }
    };
}

export default new UserRepository();
