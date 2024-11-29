import { blockchainConfigs, choicesArray, requestMapping } from '../../config/blockchain.configs';
import { RequestExecutor } from '../../core/executor/request.executor';
import { PromptService } from '../../core/prompt/prompt.service';
import { FetchBuilder } from './fetch.builder';
import { IInput } from './fetch.types';

export class FetchExecutor extends RequestExecutor<IInput> {
    private promptService: PromptService = new PromptService();

    protected async prompt(): Promise<IInput> {
        const res = await this.promptService.input<string>('choose', 'list', choicesArray)
        const blockChain = res[0]
        const requestName = res[1]
        return { blockChain, requestName }
    }
    protected async build({ blockChain, requestName }: IInput): Promise<any> {
        const request = await (new FetchBuilder())
            .setSourceUrl(blockchainConfigs[blockChain].baseUrl)
            .setRequestUrl(blockchainConfigs[blockChain].endpoints[requestMapping[requestName]].path)
            .exec()
        const requestedData = blockchainConfigs[blockChain].endpoints[requestMapping[requestName]].handler(request)
        return requestedData
    }
    // здесь сейчас по быстрому проверить но наверное нужен логер отдельный - это же можно и в тг запускать, 
    // сейчас просто в консоль, но логер нужно описать в out
    protected logger(requestedData: any): void {
        console.log(requestedData)
    }

}