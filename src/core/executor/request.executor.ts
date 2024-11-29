export abstract class RequestExecutor<Input> {
    public async execute() {
        const input = await this.prompt();
        const requestedData = await this.build(input);
        this.logger(requestedData)
    }
    protected abstract prompt(): Promise<Input>;

    protected abstract build(input: Input): any;

    protected abstract logger(requestedData: any): any
}