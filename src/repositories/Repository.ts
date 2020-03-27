import ElasticSearch from '../elasticsearch/ElasticSearch';

export class Repository {
    public readonly index?: string = undefined;

    public readonly mapping?: object = undefined;

    async getAll<T>(query?: object): Promise<T[]> {
        const result = await ElasticSearch.client.search<T>({
            index: this.index,
            type: this.index,
            size: 10000,
            body: query
        });

        return result.hits.hits.map(hit => hit._source);
    }

    async get<T>(id: string): Promise<T> {
        const result = await ElasticSearch.client.get<T>({
            index: this.index,
            type: this.index,
            id,
            ignore: 404
        });

        return result._source;
    }

    async addOrUpdate<T>(document: any): Promise<T> {
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
