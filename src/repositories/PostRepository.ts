import ElasticSearch from '../elasticsearch/ElasticSearch';
import { Post } from '../interfaces/Post';
import Repository from './Repository';

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

    async getAll(query?: object): Promise<Post[]> {
        const result = await ElasticSearch.client.search<Post>({
            index: this.index,
            type: this.index,
            size: 10000,
            body: query
        });

        return result.hits.hits.map(hit => hit._source);
    }

    async get(id: string): Promise<Post> {
        const result = await ElasticSearch.client.get<Post>({
            index: this.index,
            type: this.index,
            id,
            ignore: 404
        });

        return result._source;
    }

    async addOrUpdate(document: Post): Promise<Post> {
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

export default new PostRepository();
