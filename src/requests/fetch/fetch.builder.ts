export class FetchBuilder {
    private sourceUrl: string = '';
    private requestUrl: string = ''

    setSourceUrl(sourceUrl: string): FetchBuilder {
        this.sourceUrl = sourceUrl;
        return this;
    }
    setRequestUrl(requestUrl: string): FetchBuilder {
        this.requestUrl = requestUrl;
        return this;
    }

    async exec(): Promise<any> {
        try {
            const response = await fetch(this.sourceUrl + this.requestUrl);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка запроса:', error);
            throw error;
        }
    }
}