class Config {
    public readonly port: number;
    public readonly elasticsearchHosts: string;
    public readonly elasticsearchLog: string;

    constructor() {
        this.port = parseInt(process.env.PORT ?? '3000');
        this.elasticsearchHosts = process.env.ELASTICSEARCH_HOSTS ?? '';
        this.elasticsearchLog = process.env.ELASTICSEARCH_LOG ?? '';
    }
}

export default new Config();
