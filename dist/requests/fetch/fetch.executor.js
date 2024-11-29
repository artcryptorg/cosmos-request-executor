"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchExecutor = void 0;
const blockchain_configs_1 = require("../../config/blockchain.configs");
const request_executor_1 = require("../../core/executor/request.executor");
const prompt_service_1 = require("../../core/prompt/prompt.service");
const fetch_builder_1 = require("./fetch.builder");
class FetchExecutor extends request_executor_1.RequestExecutor {
    constructor() {
        super(...arguments);
        this.promptService = new prompt_service_1.PromptService();
    }
    prompt() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.promptService.input('choose', 'list', blockchain_configs_1.choicesArray);
            const blockChain = res[0];
            const requestName = res[1];
            return { blockChain, requestName };
        });
    }
    build(_a) {
        return __awaiter(this, arguments, void 0, function* ({ blockChain, requestName }) {
            const request = yield (new fetch_builder_1.FetchBuilder())
                .setSourceUrl(blockchain_configs_1.blockchainConfigs[blockChain].baseUrl)
                .setRequestUrl(blockchain_configs_1.blockchainConfigs[blockChain].endpoints[blockchain_configs_1.requestMapping[requestName]].path)
                .exec();
            const requestedData = blockchain_configs_1.blockchainConfigs[blockChain].endpoints[blockchain_configs_1.requestMapping[requestName]].handler(request);
            return requestedData;
        });
    }
    // здесь сейчас по быстрому проверить но наверное нужен логер отдельный - это же можно и в тг запускать, 
    // сейчас просто в консоль, но логер нужно описать в out
    logger(requestedData) {
        console.log(requestedData);
    }
}
exports.FetchExecutor = FetchExecutor;
