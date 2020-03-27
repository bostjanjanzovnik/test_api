export default abstract class Repository {
    public abstract index: string;

    public abstract mapping: object;

    public abstract async getAll(query?: object): Promise<any>;

    public abstract async get(id: string): Promise<any>;

    public abstract async addOrUpdate(document: any): Promise<any>;

    public abstract async delete(id: string): Promise<void>;
}
