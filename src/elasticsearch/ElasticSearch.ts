import elasticsearch from 'elasticsearch';
import { IndexConfig, PutMappings } from '../interfaces/ElasticSearch';
import Config from '../config/Config';
import UserRepository from '../repositories/UserRepository';
import PostRepository from '../repositories/PostRepository';

class ElasticSearch {
    public readonly client = new elasticsearch.Client({
       hosts: Config.elasticsearchHosts.split(','),
       log: Config.elasticsearchLog
    });

    async createIndices(): Promise<void> {
        const indicesConfig = this.getIndicesConfig();

        for (const index of indicesConfig) {
            const indexExists = await this.client.indices.exists({ index: index.index });

            if (!indexExists) {
                await this.client.indices.create({ index: index.index });

                const mappingConfig: PutMappings = {
                    index: index.index,
                    type: index.index,
                    include_type_name: true,
                    body: {
                        properties: index.mapping
                    },
                };

                await this.client.indices.putMapping(mappingConfig);
            }
        }
    }

    private getIndicesConfig(): IndexConfig[] {
        return [
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

export default new ElasticSearch();
