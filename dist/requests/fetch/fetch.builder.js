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
exports.FetchBuilder = void 0;
class FetchBuilder {
    constructor() {
        this.sourceUrl = '';
        this.requestUrl = '';
    }
    setSourceUrl(sourceUrl) {
        this.sourceUrl = sourceUrl;
        return this;
    }
    setRequestUrl(requestUrl) {
        this.requestUrl = requestUrl;
        return this;
    }
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(this.sourceUrl + this.requestUrl);
                if (!response.ok) {
                    throw new Error(`Ошибка HTTP: ${response.status}`);
                }
                return yield response.json();
            }
            catch (error) {
                console.error('Ошибка запроса:', error);
                throw error;
            }
        });
    }
}
exports.FetchBuilder = FetchBuilder;
