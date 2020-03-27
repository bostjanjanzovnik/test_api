import elasticsearch, { IndicesPutMappingParams } from 'elasticsearch';
import Config from '../config/Config';
import ElasticSearchIndices from '../config/ElasticSearchIndices';

export interface PutMappings extends IndicesPutMappingParams {
    include_type_name?: boolean;
}

class ElasticSearch {
    public readonly client = new elasticsearch.Client({
       hosts: Config.elasticsearchHosts.split(','),
       log: Config.elasticsearchLog
    });

    async createIndices(): Promise<void> {
        const indices = new ElasticSearchIndices();

        for (const index of indices.indices) {
            if (index.index) {
                const indexExists = await this.client.indices.exists({ index: index.index });

                if (!indexExists) {
                    await this.client.indices.create({ index: index.index });

                    if (index.mapping) {
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
        }
    }
}

export default new ElasticSearch();
