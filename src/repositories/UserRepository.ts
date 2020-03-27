import ElasticSearch from '../elasticsearch/ElasticSearch';
import { User } from '../interfaces/User';
import Repository from './Repository';

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

    async getAll(query?: object): Promise<User[]> {
        const result = await ElasticSearch.client.search<User>({
            index: this.index,
            type: this.index,
            size: 10000,
            body: query
        });

        return result.hits.hits.map(hit => hit._source);
    }

    async get(id: string): Promise<User> {
        const result = await ElasticSearch.client.get<User>({
            index: this.index,
            type: this.index,
            id,
            ignore: 404
        });

        return result._source;
    }

    async addOrUpdate(document: User): Promise<User> {
        await ElasticSearch.client.update({
            index: this.index,
            type: this.index,
            id: document.id,
            body: {
                doc: document,
                doc_as_upsert: true
            }
        });

        await new Promise(resolve => setTimeout(() => resolve(), 500));

        return document;
    }

    async delete(id: string): Promise<void> {
        await ElasticSearch.client.delete({
            index: this.index,
            type: this.index,
            id
        });
    }
}

export default new UserRepository();
